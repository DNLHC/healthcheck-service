import { addCheck } from '../services';
import createPostCheck from './post-check';

export const postCheck = createPostCheck({ addCheck });
