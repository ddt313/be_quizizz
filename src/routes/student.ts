import express from 'express';
import { getContest, getContestById } from '../controllers/contest';

const router = express.Router();

router.get('/:studentId/contests', getContest);
router.get('/contests/:contestId', getContestById);

export default router;