import { addCheck, editCheck, removeCheck, listChecks } from '../services';
import createPostCheck from './post-check';
import createPatchCheck from './patch-check';
import createDeleteCheck from './delete-check';
import createGetChecks from './get-checks';

export const postCheck = createPostCheck({ addCheck });
export const patchCheck = createPatchCheck({ editCheck });
export const deleteCheck = createDeleteCheck({ removeCheck });
export const getChecks = createGetChecks({ listChecks });
