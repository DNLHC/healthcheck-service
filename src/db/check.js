export default function createChecksDb({ createDb, createId }) {
  return Object.freeze({
    insert,
    findById,
    update,
    remove,
    findByHash,
    findAll,
  });

  function _normalize({ _id: id, ...data }) {
    return { id, ...data };
  }

  async function insert({ id, ...checkData }) {
    const _id = id || (await createId());
    const db = await createDb();

    const result = await db
      .collection('checks')
      .insertOne({ _id, ...checkData });

    return _normalize(result.ops[0]);
  }

  async function findAll({ activeOnly = false } = {}) {
    const db = await createDb();
    const query = activeOnly ? { active: true } : {};
    const result = await db.collection('checks').find(query);

    return (await result.toArray()).map(_normalize);
  }

  async function findById({ id: _id }) {
    const db = await createDb();
    const result = await db.collection('checks').find({ _id });
    const [found] = await result.toArray();

    return found ? _normalize(found) : null;
  }

  async function findByHash({ hash }) {
    const db = await createDb();
    const result = await db.collection('checks').find({ hash });
    const [found] = await result.toArray();

    return found ? _normalize(found) : null;
  }

  async function update({ id: _id, ...checkData }) {
    const db = await createDb();
    const result = await db
      .collection('checks')
      .updateOne({ _id }, { $set: checkData });

    return result.modifiedCount > 0 ? { id: _id, ...checkData } : null;
  }

  async function remove({ id: _id }) {
    const db = await createDb();
    const result = await db.collection('checks').deleteOne({ _id });
    return result.deletedCount;
  }
}
