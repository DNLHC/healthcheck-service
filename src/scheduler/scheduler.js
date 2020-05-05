export default function createScheduler({ schedules = new Map(), cronClient }) {
  return Object.freeze({
    scheduleJob,
    start,
    stop,
    reschedule,
    toggle,
    destroy,
  });

  function scheduleJob({ id, cron, active = false, handler }) {
    if (schedules.has(id)) {
      destroy({ id });
    }

    const job = cronClient.job(
      cron,
      _createHandler({ id, handler }),
      null,
      active,
      process.env.TZ
    );

    schedules.set(id, job);
  }

  function reschedule({ id, cron }) {
    const job = schedules.get(id);
    job.setTime(cronClient.time(cron));
  }

  function _createHandler({ id, handler }) {
    return () => {
      const job = schedules.get(id);

      handler({
        id,
        nextContactAt: job.nextDate().toDate().getTime(),
      });
    };
  }

  function start({ id }) {
    const job = schedules.get(id);
    job && job.start();
  }

  function stop({ id }) {
    const job = schedules.get(id);
    job && job.stop();
  }

  function toggle({ id, active }) {
    if (active) {
      start({ id });
    } else {
      stop({ id });
    }
  }

  function destroy({ id }) {
    stop({ id });
    schedules.delete(id);
  }
}
