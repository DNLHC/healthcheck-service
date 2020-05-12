import createAddCheck from './add-check';
import createEditCheck from './edit-check';
import createRemoveCheck from './remove-check';
import createListChecks from './list-checks';
import createLaunchChecks from './launch-checks';
import createFindCheck from './find-check';
import createHandleCheck from './handle-check';
import { checksDb } from '../db';
import scheduler from '../scheduler';
import createHasAttributeChanged from '../utils/has-attribute-changed';
import requestStatus from '../request-status';
import notifier from '../notifier';

export const findCheck = createFindCheck({ checksDb });
export const handleCheck = createHandleCheck({
  findCheck,
  notifier,
  checksDb,
  requestStatus,
});
export const addCheck = createAddCheck({
  checksDb,
  scheduler,
  handleCheck,
});
export const editCheck = createEditCheck({
  findCheck,
  checksDb,
  scheduler,
  createHasAttributeChanged,
});
export const removeCheck = createRemoveCheck({ checksDb, scheduler });
export const listChecks = createListChecks({ checksDb });
export const launchChecks = createLaunchChecks({
  scheduler,
  handleCheck,
  listChecks,
});
