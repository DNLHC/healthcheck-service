import got from 'got';
import { checksDb, createDb } from '../src/db';
import createFakeCheck from './fixtures/check';

const request = got.extend({
  prefixUrl: `http://healthcheck-api:${process.env.APP_PORT}/api/v1`,
  throwHttpErrors: false,
  headers: {
    'Content-Type': 'application/json',
  },
  retry: 0,
  responseType: 'json',
});

/* eslint-disable no-undefined, max-nested-callbacks */
describe('Checks API', () => {
  afterAll(async () => {
    const db = await createDb();
    return db.collection('checks').deleteMany({});
  });

  describe('Adding checks', () => {
    it('Adds a check to database', async () => {
      const fakeCheck = await createFakeCheck({ id: undefined, active: false });
      const response = await request.post('checks', { json: fakeCheck });

      expect(response.statusCode).toBe(201);

      const postedCheck = response.body.data;
      const foundCheck = await checksDb.findById({ id: postedCheck.id });

      expect(foundCheck).toEqual(postedCheck);
      expect(response.body.success).toBe(true);
      return checksDb.remove({ id: postedCheck.id });
    });

    it('Requires check to contain url', async () => {
      const fakeCheck = await createFakeCheck({
        id: undefined,
        url: undefined,
      });
      const response = await request.post('checks', { json: fakeCheck });

      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBeDefined();
    });

    it('Requires check to contain cron expression', async () => {
      const fakeCheck = await createFakeCheck({
        id: undefined,
        cron: undefined,
      });
      const response = await request.post('checks', { json: fakeCheck });

      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBeDefined();
    });
  });

  describe('Modifying checks', () => {
    it('Modifies check', async () => {
      const fakeCheck = await createFakeCheck({ name: 'inital' });
      await checksDb.insert(fakeCheck);
      const response = await request.patch(`checks/${fakeCheck.id}`, {
        json: { name: 'changed' },
      });

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe('changed');

      return checksDb.remove({ id: fakeCheck.id });
    });

    it('Resets resource', async () => {
      const fakeCheck = await createFakeCheck({
        url: 'http://ya.ru',
        statusBefore: 200,
        statusAfter: 200,
        requsetTime: 15,
      });
      await checksDb.insert(fakeCheck);
      const response = await request.patch(`checks/${fakeCheck.id}`, {
        json: { url: 'http://google.com' },
      });
      const updatedCheck = response.body.data;

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(updatedCheck.statusBefore).toBeNull();
      expect(updatedCheck.statusAfter).toBeNull();
      expect(updatedCheck.requestTime).toBeNull();

      return checksDb.remove({ id: fakeCheck.id });
    });
  });

  describe('Listing checks', () => {
    it('Lists checks', async () => {
      const fakeChecks = await Promise.all(
        Array.from({ length: 2 }, () => createFakeCheck())
      );
      const insertedChecks = await Promise.all(fakeChecks.map(checksDb.insert));
      const response = await request.get('checks');

      expect.assertions(2 + fakeChecks.length);
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);

      insertedChecks.forEach((check) => {
        expect(response.body.data).toContainEqual(check);
      });

      return Promise.all(insertedChecks.map(checksDb.remove));
    });
  });

  describe('Deleting checks', () => {
    it('Deletes check', async () => {
      const fakeCheck = await createFakeCheck();
      await checksDb.insert(fakeCheck);
      const response = await request.delete(`checks/${fakeCheck.id}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.deletedCount).toBe(1);
    });
  });
});
