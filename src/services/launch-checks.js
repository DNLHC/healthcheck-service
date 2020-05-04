import { createCheck } from '../entities';

export default function createLaunchChecks({
  listChecks,
  scheduler,
  createHandleCheck,
}) {
  return async function () {
    const checks = await listChecks();

    for (const check of checks) {
      const validCheck = await createCheck(check);

      scheduler.scheduleJob({
        id: validCheck.getId(),
        cron: validCheck.getSchedule().getCron(),
        active: validCheck.isActive(),
        handler: createHandleCheck({ id: validCheck.getId() }),
      });
    }
  };
}
