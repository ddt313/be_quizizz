import express from 'express';
import { createExamQuestion, deleteExamQuestion, getExamQuestionById, getExamQuestions, updateExamQuestion } from '../controllers/examQuestion';

const router = express.Router();

router.get('/', getExamQuestions);

router.post('/', createExamQuestion);

router.delete('/:id', deleteExamQuestion);

router.get('/details/:id', getExamQuestionById);

router.put('/details/:id', updateExamQuestion);

export default router;