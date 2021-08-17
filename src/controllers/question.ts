import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Question from '../models/question';

export const getQuestions = (req: Request, res: Response, next: NextFunction) => {
  const {limit, page} = req.query;
  Question.find()
  .limit(+limit)
  .skip((+limit) * (+page - 1))
  .populate('userId', 'name')
  .populate({
    path: 'chapterId',
    populate: { path: 'moduleId' }
  })
  .then((questions: any) => {
    Question.find().then((docs) => {
      res.json({
        statusCode: 200,
        payload: {
          questionTable: questions.map((question) => ({
            _id: question._id,
            content: question.content,
            level: question.level,
            user: question.userId.name,
            module: question.chapterId.moduleId.name,
          })),
          pageTotal: Math.ceil(docs.length / (+limit)),
          limit: +limit,
        },
      });
    });
  });
};

export const createQuestion = (req: Request, res: Response, next: NextFunction) => {
  const question = new Question({
    content: req.body.content,
    chapterId: new mongoose.Types.ObjectId(req.body.chapterId),
    answers: req.body.answers,
    level: req.body.level,
    userId: new mongoose.Types.ObjectId(req.body.userId),
    dateCreate: req.body.dateCreate,
  });

  question.save().then((result: any) => {
    res.json({status: 200, result: result});
  });
};

export const getQuestionById = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  Question
  .findById(id)
  .populate({
    path: 'chapterId',
    select: 'name',
    populate: {path: 'moduleId', select: 'name'}
  })
  .then((question: any) => {
    res.json({
      _id: question._id,
      content: question.content,
      level: question.level,
      module: question.chapterId.moduleId,
      chapter: {_id:question.chapterId._id, name: question.chapterId.name},
      answers: question.answers,
    });
  });
}

export const updateQuestion = (req: Request, res: Response, next: NextFunction) => {
  const {id} = req.params;
  const dataUpdate = {
    content: req.body.content,
    chapterId: req.body.chapter._id,
    answers: req.body.answers,
    level: req.body.level,
  };

  Question.findByIdAndUpdate(id, dataUpdate).then((value) => res.json(value));
}

export const deleteQuestion = (req: Request, res: Response, next: NextFunction) => {
  const {id} = req.params;

  Question.findByIdAndDelete(id).then((data) => res.json(data));
}