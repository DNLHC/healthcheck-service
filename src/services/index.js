import createAddCheck from './add-check';
import createEditCheck from './edit-check';
import { checksDb } from '../db';

export const addCheck = createAddCheck({ checksDb });
export const editCheck = createEditCheck({ checksDb });
