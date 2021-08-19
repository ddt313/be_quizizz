import express from 'express';
import { createClass, getClassById, getClasses, getListNameClass } from '../controllers/class';

const router = express.Router();

router.get('/name', getListNameClass);

router.get('/:lecturerId', getClasses);

router.get('/details/:id', getClassById);

router.post('/', createClass);


export default router;