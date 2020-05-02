import createAddCheck from './add-check';
import createEditCheck from './edit-check';
import createRemoveCheck from './remove-check';
import createListChecks from './list-checks';
import { checksDb } from '../db';

export const addCheck = createAddCheck({ checksDb });
export const editCheck = createEditCheck({ checksDb });
export const removeCheck = createRemoveCheck({ checksDb });
export const listChecks = createListChecks({ checksDb });
