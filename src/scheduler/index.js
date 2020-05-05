import createScheduler from './scheduler';
import cronClient from 'cron';

const scheduler = createScheduler({ schedules: new Map(), cronClient });

export default scheduler;
