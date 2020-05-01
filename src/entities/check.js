export default function buildCreateCheck({ createId, isValidUrl }) {
  return async function ({
    id,
    name,
    createdAt = Date.now(),
    modifiedAt = Date.now(),
    url,
    active = false,
    statusBefore,
    statusAfter,
    requestTime,
  }) {
    const _id = id || (await createId());

    if (!name) {
      throw new Error('Check must have a name');
    }

    if (name.length <= 2) {
      throw new Error("Check's name must be longer than 2 characters");
    }

    if (!url) {
      throw new Error('Check must have an URL');
    }

    if (!isValidUrl(url)) {
      throw new Error('URL must be valid');
    }

    return Object.freeze({
      getName: () => name,
      getId: () => _id,
      getCreatedAt: () => createdAt,
      getModifiedAt: () => modifiedAt,
      getUrl: () => url,
      isActive: () => active,
      deactivate: () => {
        active = false;
      },
      activate: () => {
        active = true;
      },
      resetResource: () => {
        statusBefore = null;
        statusAfter = null;
        requestTime = null;
      },
      getStatusBefore: () => statusBefore,
      getStatusAfter: () => statusAfter,
      getRequestTime: () => requestTime,
    });
  };
}
