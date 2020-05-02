export default function attachShutdownHandlers({ server }) {
  process.on('SIGINT', () => {
    console.info('Got SIGINT (CTRL-C in Docker). Graceful shutdown.');
    shutdown();
  });

  process.on('SIGTERM', () => {
    console.info('Got SIGTERM (Docker container stop). Graceful shutdown.');
    shutdown();
  });

  process.on('unhandledRejection', (err) => {
    console.error(err);
    shutdown();
  });

  async function shutdown() {
    try {
      await server.close();
    } catch (error) {
      console.error(error);
      process.exitCode = 1;
    } finally {
      // eslint-disable-next-line no-process-exit
      process.exit();
    }
  }
}
