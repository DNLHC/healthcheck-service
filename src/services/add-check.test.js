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
    const addCheck = createAddCheck({
      checksDb,
      scheduler: { scheduleJob() {} },
      createHandleCheck: () => {},
    });
    const insertedCheck = await addCheck(fakeCheck);
    expect(insertedCheck).toMatchObject(fakeCheck);
  });

  it('Schedules a job', async () => {
    const fakeCheck = await createFakeCheck();
    const insert = jest.fn().mockResolvedValue(fakeCheck);
    const scheduleJob = jest.fn();
    const handleCheck = () => {};

    const addCheck = createAddCheck({
      checksDb: { insert, findByHash: () => null },
      scheduler: { scheduleJob },
      handleCheck,
    });

    await addCheck(fakeCheck);

    expect(scheduleJob).toHaveBeenCalledWith({
      id: fakeCheck.id,
      active: fakeCheck.active,
      cron: fakeCheck.cron,
      handler: handleCheck,
    });
  });
});
