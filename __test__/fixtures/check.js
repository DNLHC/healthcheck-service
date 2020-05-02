import faker from 'faker';
import { nanoid } from 'nanoid/async';
import crypto from 'crypto';

function md5(string) {
  return crypto.createHash('md5').update(string, 'utf8').digest('hex');
}

export default async function createFakeCheck(overrides = {}) {
  const id = await nanoid();

  const check = {
    id,
    name: faker.internet.domainWord(),
    url: faker.internet.url(),
    active: faker.random.boolean(),
    createdAt: Date.now(),
    modifiedAt: Date.now(),
    cron: `${faker.random.number(20)} * * * *`,
    ...overrides,
  };

  check.hash =
    overrides.hash ||
    md5(`${check.name}${check.url}${check.active}${check.cron}`);

  return check;
}
