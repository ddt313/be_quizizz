import express from 'express';
import {createExam, deleteExam, getExamById, getExams, getExamsName, updateExam} from '../controllers/exam';

const router = express.Router();

router.get('/', getExams);
router.post('/', createExam);
router.delete('/:id', deleteExam);
router.get('/name', getExamsName);
router.get('/details/:id', getExamById);
router.put('/details/:id', updateExam);


export default router;