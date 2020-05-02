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

  it('must have a valid url', async () => {
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
});
