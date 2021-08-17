import express from 'express';
import { createClass, getListNameClass } from '../controllers/class';

const router = express.Router();

router.get('/name', getListNameClass);

router.post('/', createClass);


export default router;