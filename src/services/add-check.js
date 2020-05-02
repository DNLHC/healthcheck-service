import { createCheck } from '../entities';

export default function createAddCheck({ checksDb }) {
  return async function (checkData) {
    const check = await createCheck(checkData);
    const exists = await checksDb.findByHash({ hash: check.getHash() });

    if (exists) {
      return exists;
    }

    const checkSchedule = check.getSchedule();

    const insertedCheck = await checksDb.insert({
      id: check.getId(),
      hash: check.getHash(),
      createdAt: check.getCreatedAt(),
      modifiedAt: check.getModifiedAt(),
      name: check.getName(),
      active: check.isActive(),
      url: check.getUrl(),
      cron: checkSchedule.getCron(),
    });

    return insertedCheck;
  };
}
