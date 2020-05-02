export default function buildCreateCheck({
  createId,
  isValidUrl,
  md5,
  createSchedule,
}) {
  return async function (checkData = {}) {
    let {
      id,
      name,
      hash,
      createdAt = Date.now(),
      modifiedAt = Date.now(),
      url,
      active = false,
      statusBefore,
      statusAfter,
      requestTime,
      ...schedule
    } = checkData;

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

    if (!schedule) {
      throw new Error('Check must have a schedule');
    }

    const validSchedule = createSchedule(schedule);

    const createHash = () => {
      const cron = validSchedule.getCron();
      return md5(`${name}${url}${active}${cron}`);
    };

    return Object.freeze({
      getName: () => name,
      getId: () => _id,
      getHash: () => hash || (hash = createHash()),
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
      getSchedule: () => validSchedule,
    });
  };
}
