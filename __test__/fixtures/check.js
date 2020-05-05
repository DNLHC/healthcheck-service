import faker from 'faker';
import { nanoid } from 'nanoid/async';
import crypto from 'crypto';

function md5(string) {
  return crypto.createHash('md5').update(string, 'utf8').digest('hex');
}

// Ensure that generated name is longer than 2 characters
function createName() {
  const name = faker.internet.domainName();
  return name.length > 2 ? name : createName();
}

export default async function createFakeCheck(overrides = {}) {
  const id = await nanoid();

  const check = {
    id,
    name: createName(),
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
