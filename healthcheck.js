const http = require('http');

const request = http.request(
  {
    timeout: 2000,
    host: 'localhost',
    port: process.env.APP_PORT,
    path: '/healthz',
  },
  (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    process.exitCode = res.statusCode === 200 ? 0 : 1;
    // eslint-disable-next-line no-process-exit
    process.exit();
  }
);

request.on('error', (err) => {
  console.error('ERROR', err);
  // eslint-disable-next-line no-process-exit
  process.exit(1);
});

request.end();
