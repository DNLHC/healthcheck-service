import createAddCheck from './add-check';
import { checksDb } from '../db';

export const addCheck = createAddCheck({ checksDb });
