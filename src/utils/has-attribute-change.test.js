// @ts-nocheck
import createHasAttributeChanged from './has-attribute-changed';

describe('Has Attribue Changed', () => {
  const existing = {
    name: 'Jest',
    url: 'https://jestjs.io',
    list: [1, 2, 3],
    schedule: {
      cron: {
        rule: '*/2 * * * *',
        modified: false,
      },
    },
  };

  const changes = {
    name: 'Jasmine',
    list: [1, 2, 3],
    schedule: {
      cron: {
        rule: '3 * * * *',
        modified: false,
      },
    },
  };

  const hasAttributeChanged = createHasAttributeChanged({ existing, changes });

  it('Arguments must be objects', () => {
    expect(() =>
      createHasAttributeChanged({ existing: null, changes: null })
    ).toThrowError(/arguments/gi);
  });

  it('Contains changed attribute', () => {
    expect(hasAttributeChanged('name')).toBe(true);
  });

  it('Does not conain unchanged attribute', () => {
    expect(hasAttributeChanged('url')).toBe(false);
    expect(hasAttributeChanged('list')).toBe(false);
  });

  it('Works with nested attributes', () => {
    expect(hasAttributeChanged('rule')).toBe(true);
    expect(hasAttributeChanged('modified')).toBe(false);
  });
});
