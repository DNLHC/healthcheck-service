import createScheduler from './scheduler';
import cronClient from 'node-cron';

export const scheduler = createScheduler({ schedules: new Map(), cronClient });
