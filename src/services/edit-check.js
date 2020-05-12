import { createCheck } from '../entities';

export default function createEditCheck({
  findCheck,
  checksDb,
  scheduler,
  createHasAttributeChanged,
}) {
  return async function ({ id, ...changes }) {
    const existing = await findCheck({ id });

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
