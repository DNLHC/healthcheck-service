import buildCreateCheck from './check';
import buildCreateSchedule from './schedule';
import { nanoid } from 'nanoid/async';
import cron from 'node-cron';

function isValidUrl(url) {
  const exp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
  return url.match(exp);
}

export const createSchedule = buildCreateSchedule({
  isValidCron: cron.validate,
});

export const createCheck = buildCreateCheck({
  createId: nanoid,
  isValidUrl,
  createSchedule,
});
