import {Request, Response} from 'express';
import Exam from '../models/exam';
import ExamQuestion from '../models/examQuestion';

export const getExamsName = (req: Request, res: Response) => {
  Exam.find()
    .populate({path: "examQuestions"})
    .then((exams: any) => {
    console.log('exams:', exams);
    // res.json(exams);
    res.json(exams.map((exam) => ({_id: exam._id, name: exam.name})))
  });
};

export const getExams = (req: Request, res: Response) => {
  Exam.find()
    .populate({path: "examQuestions"})
    .populate({path: "moduleId"})
    .then((exams: any) => {
    console.log('exams:', exams);
    res.json(exams.map((exam) => ({
      _id: exam._id,
      name: exam.name,
      examTime: exam.examTime,
      doingExamTime: exam.doingExamTime,
      module: exam.moduleId.name,
    })));
  });
};

export const getExamById = (req: Request, res: Response) => {
  const {id} = req.params;

  Exam.findById(id)
    .populate({path: "examQuestions"})
    .populate({path: "moduleId"})
    .populate({path: "classId"})
    .then((exam: any) => {
    console.log('exam details:', exam);
    res.json({
      _id: exam._id,
      name: exam.name,
      examTime: exam.examTime,
      doingExamTime: exam.doingExamTime,
      module: exam.moduleId,
      class: exam.classId.map((c) => c.name),
      examQuestions: exam.examQuestions.map((examQuestion) => ({_id: examQuestion._id, content: examQuestion.content})),
    });
  });
};