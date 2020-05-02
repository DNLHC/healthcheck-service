export default function buildCreateSchedule({ isValidCron }) {
  return function ({ cron, lastContact, nextContact }) {
    if (!cron) {
      throw new Error('Schedule must have a cron rule.');
    }

    if (!isValidCron(cron)) {
      throw new Error('Must be a valid cron expression.');
    }

    return Object.freeze({
      getCron: () => cron,
      getLastContactAt: () => lastContact,
      getNextContactAt: () => nextContact,
    });
  };
}
