import express from 'express';
import {getExamById, getExams, getExamsName} from '../controllers/exam';

const router = express.Router();

router.get('/', getExams);
router.get('/name', getExamsName);
router.get('/details/:id', getExamById);


export default router;