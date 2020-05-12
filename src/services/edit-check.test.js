import createDb, { closeDb } from '../../__test__/fixtures/db';
import createFakeCheck from '../../__test__/fixtures/check';
import createChecksDb from '../db/check';
import createEditCheck from './edit-check';
import createHasAttributeChanged from '../utils/has-attribute-changed';
import createFindCheck from './find-check';

/* eslint-disable no-undefined */
describe('Edit Check Service', () => {
  let checksDb;
  let findCheck;

  beforeAll(() => {
    checksDb = createChecksDb({ createDb, createId: () => {} });
    findCheck = createFindCheck({ checksDb });
  });

  afterAll(() => closeDb());

  it('Must include an id', async () => {
    const editCheck = createEditCheck({
      findCheck,
      checksDb: {
        udpate: () => {
          throw new Error("Update shouldn't have been called.");
        },
      },
      createHasAttributeChanged: () => {},
      scheduler: () => {},
      createHandleCheck: () => {},
    });

    const fakeCheck = await createFakeCheck({ id: undefined });
    expect(editCheck(fakeCheck)).rejects.toThrow(/id/gi);
  });

  it('Modifies check', async () => {
    const scheduler = {
      reschedule: () => {},
      toggle: () => {},
    };
    const editCheck = createEditCheck({
      findCheck,
      checksDb,
      scheduler,
      createHasAttributeChanged,
      createHandleCheck: () => {},
    });
    const fakeCheck = await createFakeCheck({ modifiedAt: null });

    const insertedCheck = await checksDb.insert(fakeCheck);

    const editedCheck = await editCheck({
      ...fakeCheck,
      name: 'changed',
    });

    expect(editedCheck.name).toBe('changed');
    expect(insertedCheck.modifiedAt).not.toBe(editedCheck.modifiedAt);
    expect(editedCheck.hash).toBeDefined();
    expect(insertedCheck.hash).not.toBe(editedCheck.hash);
  });

  it('Resets resource fields when url has changed', async () => {
    const scheduler = {
      reschedule: () => {},
      toggle: () => {},
    };

    const editCheck = createEditCheck({
      findCheck,
      checksDb,
      createHasAttributeChanged,
      scheduler,
      createHandleCheck: () => {},
    });

    const fakeCheck = await createFakeCheck({
      statusBefore: 200,
      statusAfter: 200,
      requestTime: 100,
    });

    const insertedCheck = await checksDb.insert(fakeCheck);

    expect(insertedCheck.statusBefore).toBe(fakeCheck.statusBefore);
    expect(insertedCheck.statusAfter).toBe(fakeCheck.statusAfter);
    expect(insertedCheck.requestTime).toBe(fakeCheck.requestTime);

    const editedCheck = await editCheck({
      ...fakeCheck,
      url: 'http://example.com',
    });

    expect(editedCheck.url).toBe('http://example.com');
    expect(editedCheck.statusBefore).toBeNull();
    expect(editedCheck.statusAfter).toBeNull();
    expect(editedCheck.requestTime).toBeNull();
  });

  it('Toggles schedule if state changes', async () => {
    const scheduler = {
      reschedule: () => {},
      toggle: jest.fn(),
    };

    const editCheck = createEditCheck({
      findCheck,
      checksDb,
      createHasAttributeChanged,
      scheduler,
      createHandleCheck: () => {},
    });

    const fakeCheck = await createFakeCheck({ active: true });
    await checksDb.insert(fakeCheck);

    const editedCheck = await editCheck({
      ...fakeCheck,
      active: false,
      hash: null,
    });

    expect(editedCheck.active).toBe(false);
    expect(scheduler.toggle).toHaveBeenCalledWith({
      id: editedCheck.id,
      active: editedCheck.active,
    });
  });

  it('Reschedules job if cron rule has changed', async () => {
    const scheduler = {
      reschedule: jest.fn(),
      toggle: () => {},
    };

    const editCheck = createEditCheck({
      findCheck,
      checksDb,
      createHasAttributeChanged,
      scheduler,
      handleCheck: () => {},
    });

    const fakeCheck = await createFakeCheck();
    await checksDb.insert(fakeCheck);

    const editedCheck = await editCheck({
      ...fakeCheck,
      cron: '*/2 * 10 * 1',
    });

    expect(editedCheck.cron).toBe('*/2 * 10 * 1');
    expect(scheduler.reschedule).toHaveBeenCalledWith({
      id: editedCheck.id,
      cron: editedCheck.cron,
    });
  });
});
