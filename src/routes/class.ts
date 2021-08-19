import express from 'express';
import { createClass, getClasses, getListNameClass } from '../controllers/class';

const router = express.Router();

router.get('/name', getListNameClass);

router.get('/:lecturerId', getClasses);

router.post('/', createClass);


export default router;