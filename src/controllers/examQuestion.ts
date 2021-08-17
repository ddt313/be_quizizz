import {Request, Response} from 'express';
import ExamQuestion from '../models/examQuestion';
import mongoose from 'mongoose';
import Module from '../models/module';
import Question from '../models/question';
import Exam from '../models/exam';

export const getExamQuestions = (req: Request, res: Response) => {
  const {page, limit} = req.query;

  ExamQuestion.find()
    .limit(+limit)
    .skip(+limit * (+page - 1))
    .populate('moduleId', 'name')
    .then((examQuestions: any) => {
      ExamQuestion.find().then((data) => {
        res.json({
          examQuestions: examQuestions.map((examQuestion) => ({
            _id: examQuestion._id,
            content: examQuestion.content,
            module: examQuestion.moduleId.name,
            numberOfQuestions: examQuestion.questions.length,
          })),
          pagination: {
            limit: +limit,
            pageTotal: Math.ceil(data.length / +limit),
          },
        });
      });
    });
};

export const getExamQuestionById = (req: Request, res: Response) => {
  const {id} = req.params;

  ExamQuestion.findById(id)
    .populate({
      path: 'moduleId',
    })
    .populate({
      path: 'questions',
      populate: {path: 'chapterId'},
    })
    .then((examQuestion: any) => {
      Exam.find().populate({
        path: 'examQuestions',
        math: { _id: id },
      }).then((exam: any) => {
        console.log('exam', exam);
        res.json({
          _id: examQuestion._id,
          content: examQuestion.content,
          module: {
            _id: examQuestion.moduleId._id,
            name: examQuestion.moduleId.name,
          },
          exam: {
            _id: exam[0] ? exam[0]._id : '',
            name: exam[0] ? exam[0].name : '',
          },
          questions: examQuestion.questions.map((question) => ({
            _id: question._id,
            content: question.content,
            chapter: question.chapterId.name,
            level: question.level,
          })),
        })
      });
    });
};

export const createExamQuestion = (req: Request, res: Response) => {
  const examQuestion = new ExamQuestion({
    content: req.body.content,
    moduleId: new mongoose.Types.ObjectId(req.body.moduleId),
    userId: new mongoose.Types.ObjectId(req.body.userId),
    dateCreate: req.body.dateCreate,
    questions: req.body.questions,
  });

  examQuestion.save().then((result) => {
    res.json(result);
  });
};

export const updateExamQuestion = (req: Request, res: Response) => {
  const {id} = req.params;

  const dataUpdate: any = {
    content: req.body.content,
    moduleId: new mongoose.Types.ObjectId(req.body.moduleId),
    userId: new mongoose.Types.ObjectId(req.body.userId),
    dateCreate: req.body.dateCreate,
    questions: req.body.questions,
  };

  ExamQuestion.findByIdAndUpdate(id, dataUpdate)
    .then((value) => res.json(value));
};
