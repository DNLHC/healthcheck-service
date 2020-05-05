import ErrorResponse from '../utils/error-response';
import { createCheck } from '../entities';

export default function createHandleCheck({
  notifier,
  checksDb,
  requestStatus,
}) {
  return async function ({ id, nextContactAt }) {
    if (!id) {
      throw new ErrorResponse('You must supply an id', 400);
    }

    const check = await checksDb.findById({ id });
    const { status, time } = await requestStatus({ url: check.url });

    const validCheck = await createCheck({
      ...check,
      statusBefore: check.statusAfter || status,
      statusAfter: status,
      requestTime: time,
      modifiedAt: Date.now(),
      lastContactAt: Date.now(),
      nextContactAt,
    });

    const validSchedule = validCheck.getSchedule();

    const updatedCheck = await checksDb.update({
      id: validCheck.getId(),
      modifiedAt: validCheck.getModifiedAt(),
      statusBefore: validCheck.getStatusBefore(),
      statusAfter: validCheck.getStatusAfter(),
      requestTime: validCheck.getRequestTime(),
      lastContactAt: validSchedule.getLastContactAt(),
      nextContactAt: validSchedule.getNextContactAt(),
    });

    if (validCheck.getStatusBefore() !== validCheck.getStatusAfter()) {
      await notify({
        name: validCheck.getName(),
        url: validCheck.getUrl(),
        statusBefore: validCheck.getStatusBefore(),
        statusAfter: validCheck.getStatusAfter(),
      });
    }

    return { ...check, ...updatedCheck };
  };

  function notify({ name, url, statusBefore, statusAfter }) {
    const subject = `[healthcheck] ${name}'s status changed`;
    const text = `${name}, ${url}, ${statusBefore}, ${statusAfter}`;
    return notifier({ subject, text });
  }
}
