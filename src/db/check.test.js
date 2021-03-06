import createDb, { closeDb } from '../../__test__/fixtures/db';
import createFakeCheck from '../../__test__/fixtures/check';
import createChecksDb from './check';

describe('Checks Database', () => {
  let checksDb;

  beforeAll(() => {
    checksDb = createChecksDb({ createDb, createId: () => {} });
  });

  afterAll(() => closeDb());

  it('Inserts a check', async () => {
    const fakeCheck = await createFakeCheck();
    const result = await checksDb.insert(fakeCheck);
    expect(result).toEqual(fakeCheck);
  });

  it('Finds a check by id', async () => {
    const fakeCheck = await createFakeCheck();
    await checksDb.insert(fakeCheck);
    const foundCheck = await checksDb.findById({ id: fakeCheck.id });
    expect(foundCheck).toEqual(fakeCheck);
  });

  it('Finds a check by hash', async () => {
    const assertions = 3;
    async function runAssertion() {
      const fakeCheck = await createFakeCheck();
      const insertedCheck = await checksDb.insert(fakeCheck);
      const foundCheck = await checksDb.findByHash({ hash: fakeCheck.hash });
      expect(foundCheck).toEqual(insertedCheck);
    }

    expect.assertions(assertions);
    return Promise.all(Array.from({ length: assertions }, runAssertion));
  });

  it('Updates a check', async () => {
    const fakeCheck = await createFakeCheck();
    await checksDb.insert(fakeCheck);
    const updatedCheck = await checksDb.update({
      ...fakeCheck,
      name: 'changed',
    });

    expect(updatedCheck.name).toBe('changed');
  });

  it('Deletes a check', async () => {
    const fakeCheck = await createFakeCheck();
    await checksDb.insert(fakeCheck);
    const response = await checksDb.remove({ id: fakeCheck.id });
    expect(response).toBe(1);
  });
});
