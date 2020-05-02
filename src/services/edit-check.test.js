// @ts-nocheck
import createDb, { closeDb } from '../../__test__/fixtures/db';
import createFakeCheck from '../../__test__/fixtures/check';
import createChecksDb from '../db/check';
import createEditCheck from './edit-check';

/* eslint-disable no-undefined */
describe('Edit Check Service', () => {
  let checksDb;

  beforeAll(() => {
    checksDb = createChecksDb({ createDb, createId: () => {} });
  });

  afterAll(() => closeDb());

  it('Must include an id', async () => {
    const editCheck = createEditCheck({
      checksDb: {
        udpate: () => {
          throw new Error("Update shouldn't have been called.");
        },
      },
    });

    const fakeCheck = await createFakeCheck({ id: undefined });
    expect(editCheck(fakeCheck)).rejects.toThrow(/id/gi);
  });

  it('Modifies check', async () => {
    const editCheck = createEditCheck({ checksDb });
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
});
