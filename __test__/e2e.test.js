// @ts-nocheck
import got from 'got';
import { checksDb, createDb } from '../src/db';
import createFakeCheck from './fixtures/check';

/* eslint-disable no-undefined, max-nested-callbacks */
describe('Checks API', () => {
  let request;

  beforeAll(() => {
    request = got.extend({
      prefixUrl: `http://healthcheck-api:${process.env.APP_PORT}/api/v1`,
      throwHttpErrors: false,
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'json',
    });
  });

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
});
