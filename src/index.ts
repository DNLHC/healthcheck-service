import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

if (process.env.NODE_ENV === 'develepment') {
  app.use(morgan('dev'));
}

app.listen(process.env.APP_PORT, () => {
  console.log('Server is listening.');
});
