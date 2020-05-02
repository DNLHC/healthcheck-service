import express from 'express';
import createControllerAdapter from '../controller-adapter';
import { postCheck } from '../../controllers';

const router = express.Router();

router.post('/', createControllerAdapter(postCheck));

export default router;
