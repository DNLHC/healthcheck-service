// @ts-nocheck
import { createCheck } from './';
import createFakeCheck from '../../__test__/fixtures/check';

/* eslint-disable no-undefined */
describe('Check Entity', () => {
  it('Must have a name', async () => {
    const fakeCheck = await createFakeCheck({ name: undefined });
    expect(createCheck(fakeCheck)).rejects.toThrowError(/name/gi);
  });

  it('Must have a name longer than 2 characters', async () => {
    const fakeCheck = await createFakeCheck({ name: 'na' });
    expect(createCheck(fakeCheck)).rejects.toThrowError(/longer/gi);
  });

  it('Must have an url', async () => {
    const fakeCheck = await createFakeCheck({ url: undefined });
    expect(createCheck(fakeCheck)).rejects.toThrowError(/url/gi);
  });

  it('Must have a valid url', async () => {
    const invalidArgs = ['invalid-url', 'google.com', 'ssh://yandex.ru'];
    const validArgs = [
      'http://yandex.ru',
      'http://www.ya.ru',
      'https://google.com',
      'http://yandex.money.ru',
    ];

    async function testInvalidUrl(url) {
      const fakeCheck = await createFakeCheck({ url });
      return expect(createCheck(fakeCheck)).rejects.toThrowError(/valid/gi);
    }

    async function testValidUrl(url) {
      const fakeCheck = await createFakeCheck({ url });
      return expect(createCheck(fakeCheck)).resolves.not.toThrow();
    }

    expect.assertions(invalidArgs.length + validArgs.length);

    return Promise.all([
      ...invalidArgs.map(testInvalidUrl),
      ...validArgs.map(testValidUrl),
    ]);
  });

  it('Can create an id', async () => {
    const fakeCheck = await createFakeCheck({ id: undefined });
    const check = await createCheck(fakeCheck);
    expect(check.getId()).toBeDefined();
  });

  it('Can be activated', async () => {
    const fakeCheck = await createFakeCheck({ active: false });
    const check = await createCheck(fakeCheck);
    expect(check.isActive()).toBe(false);
    check.activate();
    expect(check.isActive()).toBe(true);
  });

  it('Can be deactivated', async () => {
    const fakeCheck = await createFakeCheck({ active: true });
    const check = await createCheck(fakeCheck);
    expect(check.isActive()).toBe(true);
    check.deactivate();
    expect(check.isActive()).toBe(false);
  });

  it('Can reset resource', async () => {
    const fakeCheck = await createFakeCheck({
      statusBefore: 200,
      statusAfter: 503,
      requestTime: 100,
    });

    const check = await createCheck(fakeCheck);

    expect(check.getStatusBefore()).toBe(fakeCheck.statusBefore);
    expect(check.getStatusAfter()).toBe(fakeCheck.statusAfter);
    expect(check.getRequestTime()).toBe(fakeCheck.requestTime);

    check.resetResource();

    expect(check.getStatusBefore()).toBeNull();
    expect(check.getStatusAfter()).toBeNull();
    expect(check.getRequestTime()).toBeNull();
  });

  it('Includes a hash', async () => {
    const fakeCheck = await createCheck({
      name: 'Google',
      url: 'https://google.com',
      active: true,
      cron: '5 0 * 8 *',
    });

    expect(fakeCheck.getHash()).toBe('c27f27fea912e58222ba9d38c811759a');
  });

  it('Schedule must have a cron expression', async () => {
    const fakeCheck = await createFakeCheck({ cron: undefined });
    expect(createCheck(fakeCheck)).rejects.toThrowError(/cron/gi);
  });

  it('Schedule must have a valid cron expression', async () => {
    expect.assertions(3);

    async function testInvalidCron(cron) {
      const fakeCheck = await createFakeCheck({ cron });
      return expect(createCheck(fakeCheck)).rejects.toThrowError(
        /valid cron/gi
      );
    }

    async function testValidCron(cron) {
      const fakeCheck = await createFakeCheck({ cron });
      return expect(createCheck(fakeCheck)).resolves.not.toThrow();
    }

    const tests = [
      testInvalidCron('invalid cron expression'),
      testValidCron('*/2 10 * * *'),
      testValidCron('10 10 10 * * *'),
    ];

    return Promise.all(tests);
  });
});
