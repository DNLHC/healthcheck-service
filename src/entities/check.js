import ErrorResponse from '../utils/error-response';

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
      throw new ErrorResponse('Check must have a name', 400);
    }

    if (name.length <= 2) {
      throw new ErrorResponse(
        "Check's name must be longer than 2 characters",
        400
      );
    }

    if (!url) {
      throw new ErrorResponse('Check must have an URL', 400);
    }

    if (!isValidUrl(url)) {
      throw new ErrorResponse('URL must be valid', 400);
    }

    if (!schedule) {
      throw new ErrorResponse('Check must have a schedule', 400);
    }

    const validSchedule = createSchedule(schedule);

    const createHash = () => {
      const cron = validSchedule.getCron();
      return md5(`${name}${url}${active}${cron}`);
    };

    let hash;

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
