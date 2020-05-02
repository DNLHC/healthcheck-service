import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGO_URL, {
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

export default async function createDb() {
  if (!client.isConnected()) {
    await connect();
  }

  return client.db();
}

export function closeDb() {
  return client.close();
}

export async function cleanDb() {
  const db = await createDb();
  return db.collection('checks').deleteMany({});
}
