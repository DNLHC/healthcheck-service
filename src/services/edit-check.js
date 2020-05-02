import { createCheck } from '../entities';

export default function createEditCheck({ checksDb }) {
  return async function ({ id, ...changes }) {
    if (!id) {
      throw new Error('You must supply an id.');
    }

    const existing = await checksDb.findById({ id });

    if (!existing) {
      throw new Error(`Check was not found with id of ${id}.`);
    }

    const check = await createCheck({
      ...existing,
      ...changes,
      modifiedAt: Date.now(),
    });

    const checkSchedule = check.getSchedule();

    const updatedCheck = await checksDb.update({
      id,
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

    return { ...existing, ...updatedCheck };
  };
}
