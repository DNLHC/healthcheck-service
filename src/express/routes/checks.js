import express from 'express';
import createControllerAdapter from '../controller-adapter';
import {
  postCheck,
  patchCheck,
  deleteCheck,
  getChecks,
} from '../../controllers';

const router = express.Router();

router
  .get('/', createControllerAdapter(getChecks))
  .post('/', createControllerAdapter(postCheck))
  .patch('/:id', createControllerAdapter(patchCheck))
  .delete('/:id', createControllerAdapter(deleteCheck));

export default router;
