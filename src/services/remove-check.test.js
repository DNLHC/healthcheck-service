// @ts-nocheck
import createDb, { closeDb } from '../../__test__/fixtures/db';
import createFakeCheck from '../../__test__/fixtures/check';
import createChecksDb from '../db/check';
import createRemoveCheck from './remove-check';

describe('Remove Check Service', () => {
  let checksDb;

  beforeAll(() => {
    checksDb = createChecksDb({ createDb, createId: () => {} });
  });

  afterAll(() => closeDb());

  it('Handles non existent checks', async () => {
    const removeCheck = createRemoveCheck({
      checksDb,
      scheduler: { destroy() {} },
    });
    const expectedResponse = {
      deletedCount: 0,
      message: 'Check not found, nothing to delete.',
    };

    const actualResponse = await removeCheck({ id: '123' });
    expect(actualResponse).toEqual(expectedResponse);
  });

  it('Deletes check', async () => {
    const removeCheck = createRemoveCheck({
      checksDb,
      scheduler: { destroy() {} },
    });

    const fakeCheck = await createFakeCheck();
    await checksDb.insert(fakeCheck);

    const foundCheck = await checksDb.findById({ id: fakeCheck.id });
    expect(foundCheck).toEqual(fakeCheck);

    const expectedResponse = {
      deletedCount: 1,
      message: `Check with id of ${fakeCheck.id} has been deleted.`,
    };

    const actualResponse = await removeCheck({ id: fakeCheck.id });
    expect(actualResponse).toEqual(expectedResponse);

    const notFoundCheck = await checksDb.findById({ id: fakeCheck.id });
    expect(notFoundCheck).toBeNull();
  });

  it('Unschedules check', async () => {
    const destroy = jest.fn();
    const fakeCheck = await createFakeCheck();
    const mockDb = {
      findById: jest.fn().mockResolvedValue(fakeCheck),
      remove: jest.fn().mockResolvedValue(1),
    };

    const removeCheck = createRemoveCheck({
      checksDb: mockDb,
      scheduler: { destroy },
    });

    await removeCheck({ id: fakeCheck.id });
    expect(destroy).toHaveBeenCalledWith({ id: fakeCheck.id });
  });
});
