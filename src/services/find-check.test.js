import createFakeCheck from '../../__test__/fixtures/check';
import createFindCheck from './find-check';
import createChecksDb from '../db/check';
import createDb, { closeDb } from '../../__test__/fixtures/db';

/* eslint-disable no-undefined */
describe('Find Check Service', () => {
  let checksDb;

  beforeAll(() => {
    checksDb = createChecksDb({ createDb, createId: () => {} });
  });

  afterAll(() => closeDb());

  it('Throws error when id is not provided.', () => {
    const findCheck = createFindCheck({ checksDb });
    expect(findCheck({ id: undefined })).rejects.toThrow(/id/gi);
  });

  it('Throws error when check is not found.', async () => {
    const findCheck = createFindCheck({ checksDb });
    expect(findCheck({ id: '123' })).rejects.toThrow(/not found/gi);
  });

  it('Finds a check.', async () => {
    const fakeCheck = await createFakeCheck();
    const insertedCheck = await checksDb.insert(fakeCheck);
    const findCheck = createFindCheck({ checksDb });
    const foundCheck = await findCheck({ id: insertedCheck.id });
    expect(foundCheck).toEqual(insertedCheck);
  });
});
