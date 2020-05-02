export default function createScheduler({ schedules = new Map(), cronClient }) {
  return Object.freeze({
    scheduleJob,
    start,
    stop,
    destroy,
  });

  function scheduleJob({ id, cron, active = false, handler }) {
    const job = cronClient.schedule(cron, handler, {
      scheduled: active,
    });

    schedules.set(id, job);
  }

  function start({ id }) {
    const job = schedules.get(id);
    job && job.start();
  }

  function stop({ id }) {
    const job = schedules.get(id);
    job && job.stop();
  }

  function destroy({ id }) {
    const job = schedules.get(id);

    if (job) {
      schedules.delete(id);
      job.destroy();
    }
  }
}
