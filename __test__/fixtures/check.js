import faker from 'faker';
import { nanoid } from 'nanoid/async';

export default async function createFakeCheck(overrides = {}) {
  const id = await nanoid();

  return {
    id,
    name: faker.internet.domainWord(),
    url: faker.internet.url(),
    active: faker.random.boolean(),
    createdAt: Date.now(),
    modifiedAt: Date.now(),
    cron: `${faker.random.number(20)} * * * *`,
    ...overrides,
  };
}
