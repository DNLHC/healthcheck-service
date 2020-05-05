import buildCreateCheck from './check';
import buildCreateSchedule from './schedule';
import { nanoid } from 'nanoid/async';
import crypto from 'crypto';
import cronClient from 'cron';

function isValidUrl(url) {
  const exp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
  return url.match(exp);
}

function md5(string) {
  return crypto.createHash('md5').update(string, 'utf8').digest('hex');
}

function isValidCron(cron) {
  try {
    cronClient.time(cron);
    return true;
  } catch (err) {
    return false;
  }
}

export const createSchedule = buildCreateSchedule({ isValidCron });

export const createCheck = buildCreateCheck({
  createId: nanoid,
  isValidUrl,
  md5,
  createSchedule,
});
