import { createCheck } from '../entities';
import ErrorResponse from '../utils/error-response';

export default function createEditCheck({
  checksDb,
  scheduler,
  createHasAttributeChanged,
}) {
  return async function ({ id, ...changes }) {
    if (!id) {
      throw new ErrorResponse('You must supply an id.', 400);
    }

    const existing = await checksDb.findById({ id });

    if (!existing) {
      throw new ErrorResponse(`Check was not found with id of ${id}.`, 401);
    }

    const check = await createCheck({
      ...existing,
      ...changes,
      modifiedAt: Date.now(),
    });

    if (check.getHash() === existing.hash) {
      return existing;
    }

    const checkSchedule = check.getSchedule();

    const hasAttributeChanged = createHasAttributeChanged({
      changes,
      existing,
    });

    if (hasAttributeChanged('url')) {
      check.resetResource();
    }

    const updatedCheck = await checksDb.update({
      id: check.getId(),
      hash: check.getHash(),
      name: check.getName(),
      url: check.getUrl(),
      active: check.isActive(),
      modifiedAt: check.getModifiedAt(),
      statusBefore: check.getStatusBefore(),
      statusAfter: check.getStatusAfter(),
      requestTime: check.getRequestTime(),
      cron: checkSchedule.getCron(),
    });

    if (hasAttributeChanged('cron')) {
      scheduler.reschedule({
        id: check.getId(),
        cron: checkSchedule.getCron(),
      });
    }

    if (hasAttributeChanged('active')) {
      scheduler.toggle({ id: check.getId(), active: check.isActive() });
    }

    return { ...existing, ...updatedCheck };
  };
}
