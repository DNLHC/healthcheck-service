// @ts-nocheck
import createDb, { closeDb } from '../../__test__/fixtures/db';
import createFakeCheck from '../../__test__/fixtures/check';
import createChecksDb from '../db/check';
import buildCreateHandleCheck from './handle-check';

/* eslint-disable no-undefined */
describe('Handle Check Service', () => {
  let checksDb;

  beforeAll(() => {
    checksDb = createChecksDb({ createDb, createId: () => {} });
  });

  afterAll(() => closeDb());

  it('Must supply an id', async () => {
    const createHandleCheck = buildCreateHandleCheck({
      checksDb: null,
      notifier: null,
      requestStatus: null,
    });
    expect(() => createHandleCheck({ id: undefined })).toThrowError(/id/gi);
  });

  it("Updates check's status", async () => {
    const requestResponse = {
      status: 200,
      time: 100,
    };
    const requestStatus = jest.fn().mockResolvedValue(requestResponse);

    const createHandleCheck = buildCreateHandleCheck({
      requestStatus,
      notifier: () => {},
      checksDb,
    });

    const fakeCheck = await createFakeCheck({
      statusBefore: 200,
      statusAfter: 503,
      requestTime: null,
    });

    const insertedCheck = await checksDb.insert(fakeCheck);

    expect(insertedCheck.statusBefore).toBe(fakeCheck.statusBefore);
    expect(insertedCheck.statusAfter).toBe(fakeCheck.statusAfter);
    expect(insertedCheck.requestTime).toBeNull();

    const handleCheck = createHandleCheck({ id: fakeCheck.id });
    const updatedCheck = await handleCheck();

    expect(requestStatus).toHaveBeenCalledWith({ url: fakeCheck.url });
    expect(updatedCheck.statusBefore).toBe(insertedCheck.statusAfter);
    expect(updatedCheck.statusAfter).toBe(requestResponse.status);
    expect(updatedCheck.requestTime).toBe(requestResponse.time);
    expect(updatedCheck.modifiedAt).not.toBe(insertedCheck.modifiedAt);
    expect(updatedCheck.lastContactAt).not.toBe(insertedCheck.lastContactAt);
  });

  it('Sends notification', async () => {
    const requestResponse = {
      status: 500,
      time: null,
    };
    const requestStatus = jest.fn().mockResolvedValue(requestResponse);
    const notifier = jest.fn();

    const createHandleCheck = buildCreateHandleCheck({
      requestStatus,
      notifier,
      checksDb,
    });

    const fakeCheck = await createFakeCheck({
      statusBefore: 200,
      statusAfter: 200,
      requestTime: 100,
    });

    const insertedCheck = await checksDb.insert(fakeCheck);
    const handleCheck = createHandleCheck({ id: fakeCheck.id });
    const updatedCheck = await handleCheck();

    const getExpectedNotifierArgs = () => {
      const { name, url, statusBefore, statusAfter } = updatedCheck;
      const subject = `[healthcheck] ${name}'s status changed`;
      const text = `${name}, ${url}, ${statusBefore}, ${statusAfter}`;
      return { subject, text };
    };

    expect(updatedCheck.statusAfter).toBe(requestResponse.status);
    expect(updatedCheck.statusAfter).not.toBe(insertedCheck.statusAfter);
    expect(updatedCheck.requestTime).toBeNull();
    expect(notifier).toHaveBeenCalledWith(getExpectedNotifierArgs());
  });
});
