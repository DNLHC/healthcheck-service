import { isEqual, isPlainObject } from 'lodash';

export default function createHasAttributeChanged({ changes, existing }) {
  if (!isPlainObject(changes) || !isPlainObject(existing)) {
    throw new Error('Both arguments must be objects.');
  }

  const changedAttributes = collectChangedAttributes(changes, existing);

  return (attribute) => changedAttributes.includes(attribute);
}

function collectChangedAttributes(a, b) {
  return Object.keys(a).reduce((attributes, key) => {
    if (isPlainObject(a[key]) && isPlainObject(b[key])) {
      attributes.push(...collectChangedAttributes(a[key], b[key]));
      return attributes;
    }

    if (!isEqual(a[key], b[key])) {
      attributes.push(key);
    }

    return attributes;
  }, []);
}
