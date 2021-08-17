import express from 'express';

import {getQuestions, createQuestion, getQuestionById, updateQuestion, deleteQuestion} from '../controllers/question';

const router = express.Router();

router.get('/', getQuestions);

router.post('/', createQuestion);

router.get('/details/:id', getQuestionById);

router.put('/:id', updateQuestion);

router.delete('/:id', deleteQuestion);
export default router;
