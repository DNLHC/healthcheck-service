import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { checksRoutes } from './express/routes';
import errorHandler from './express/error-handler';
import { createDb } from './db';
import attachShutdownHandlers from './express/shutdown-handler';

const app = express();

app.use(bodyParser.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/checks', checksRoutes);

app.use(errorHandler);

(async () => {
  try {
    await createDb();
    const server = app.listen(process.env.APP_PORT);
    attachShutdownHandlers({ server });
  } catch (error) {
    console.error(error);
  }
})();
