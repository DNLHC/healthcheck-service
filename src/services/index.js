import createAddCheck from './add-check';
import createEditCheck from './edit-check';
import createRemoveCheck from './remove-check';
import createListChecks from './list-checks';
import buildCreateHandleCheck from './handle-check';
import { checksDb } from '../db';
import scheduler from '../scheduler';
import createHasAttributeChanged from '../utils/has-attribute-changed';

export const createHandleCheck = buildCreateHandleCheck();
export const addCheck = createAddCheck({
  checksDb,
  scheduler,
  createHandleCheck,
});
export const editCheck = createEditCheck({
  checksDb,
  scheduler,
  createHandleCheck,
  createHasAttributeChanged,
});
export const removeCheck = createRemoveCheck({ checksDb, scheduler });
export const listChecks = createListChecks({ checksDb });
