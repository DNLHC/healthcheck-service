import createChecksDb from './check';
import { MongoClient } from 'mongodb';
import { nanoid } from 'nanoid/async';

const url = `mongodb://db:${process.env.DATABASE_PORT}`;
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let connection;

function connect() {
  if (!connection) {
    connection = client.connect();
  }

  return connection;
}

export async function createDb() {
  if (!client.isConnected()) {
    await connect();
  }
  return client.db(process.env.DATABASE_NAME);
}

export function closeDb() {
  return client.close();
}

export const checksDb = createChecksDb({ createDb, createId: nanoid });
