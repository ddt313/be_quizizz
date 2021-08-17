import express from 'express';
import { createExamQuestion, getExamQuestionById, getExamQuestions, updateExamQuestion } from '../controllers/examQuestion';

const router = express.Router();

router.get('/', getExamQuestions);

router.post('/', createExamQuestion);

router.get('/details/:id', getExamQuestionById);

router.put('/details/:id', updateExamQuestion);

export default router;