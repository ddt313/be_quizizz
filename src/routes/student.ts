import express from 'express';
import { finishedContest, getContest, getContestById, getFinishedContest } from '../controllers/contest';

const router = express.Router();

router.get('/:studentId/contests', getContest);
router.get('/contests/:contestId', getContestById);
router.patch('/contests', finishedContest);
router.get('/contests/finished/:studentId', getFinishedContest);

export default router;