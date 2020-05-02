import ErrorResponse from '../utils/error-response';

export default function buildCreateSchedule({ isValidCron }) {
  return function ({ cron, lastContact, nextContact }) {
    if (!cron) {
      throw new ErrorResponse('Schedule must have a cron rule.', 400);
    }

    if (!isValidCron(cron)) {
      throw new ErrorResponse('Must be a valid cron expression.', 400);
    }

    return Object.freeze({
      getCron: () => cron,
      getLastContactAt: () => lastContact,
      getNextContactAt: () => nextContact,
    });
  };
}
