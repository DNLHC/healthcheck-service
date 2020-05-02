import createScheduler from './scheduler';
import cronClient from 'node-cron';

const scheduler = createScheduler({ schedules: new Map(), cronClient });

export default scheduler;
