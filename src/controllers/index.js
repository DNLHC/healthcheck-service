import {
  addCheck,
  editCheck,
  removeCheck,
  listChecks,
  findCheck,
} from '../services';
import createPostCheck from './post-check';
import createPatchCheck from './patch-check';
import createDeleteCheck from './delete-check';
import createGetChecks from './get-checks';
import createGetCheck from './get-check';

export const postCheck = createPostCheck({ addCheck });
export const patchCheck = createPatchCheck({ editCheck });
export const deleteCheck = createDeleteCheck({ removeCheck });
export const getChecks = createGetChecks({ listChecks });
export const getCheck = createGetCheck({ findCheck });
