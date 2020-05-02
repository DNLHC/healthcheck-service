// @ts-nocheck
import createFakeCheck from '../../__test__/fixtures/check';
import createAddCheck from './add-check';
import createChecksDb from '../db/check';
import createDb, { closeDb } from '../../__test__/fixtures/db';
import { nanoid } from 'nanoid/async';

describe('Add Check Service', () => {
  let checksDb;

  beforeAll(() => {
    checksDb = createChecksDb({ createDb, createId: nanoid });
  });

  afterAll(() => closeDb());

  it('Inserts check in the database', async () => {
    const fakeCheck = await createFakeCheck();
    const addCheck = createAddCheck({ checksDb });
    const insertedCheck = await addCheck(fakeCheck);
    expect(insertedCheck).toMatchObject(fakeCheck);
  });
});
