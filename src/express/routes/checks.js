import express from 'express';
import createControllerAdapter from '../controller-adapter';
import {
  postCheck,
  patchCheck,
  deleteCheck,
  getChecks,
  getCheck,
} from '../../controllers';

const router = express.Router();

router
  .get('/', createControllerAdapter(getChecks))
  .get('/:id', createControllerAdapter(getCheck))
  .post('/', createControllerAdapter(postCheck))
  .patch('/:id', createControllerAdapter(patchCheck))
  .delete('/:id', createControllerAdapter(deleteCheck));

export default router;
