import {Request, Response} from 'express';
import Exam from '../models/exam';
import ExamQuestion from '../models/examQuestion';

export const getExamsName = (req: Request, res: Response) => {
  Exam.find()
    .populate({path: "examQuestions"})
    .then((exams: any) => {
    // res.json(exams);
    res.json(exams.map((exam) => ({_id: exam._id, name: exam.name})))
  });
};

export const getExams = (req: Request, res: Response) => {
  Exam.find()
    .populate({path: "examQuestions"})
    .populate({path: "moduleId"})
    .then((exams: any) => {
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
    .populate({path: "finished.studentId", select: "name studentId _id"})
    .then((exam: any) => {
    res.json({
      _id: exam._id,
      name: exam.name,
      examTime: exam.examTime,
      doingExamTime: exam.doingExamTime,
      module: exam.moduleId,
      class: exam.classId.map((c) => ({_id: c._id ,name: c.name})),
      examQuestions: exam.examQuestions.map((examQuestion) => ({_id: examQuestion._id, content: examQuestion.content})),
      finished: exam.finished,
    });
  });
};

export const updateExam = (req:Request, res: Response) => {
  const {id} = req.params;

  const {name, moduleId, examQuestions, lecturerId, doingExamTime, examTime, classId} = req.body;

  const dataUpdateExam = {
    name, moduleId, examQuestions, lecturerId, doingExamTime, examTime, classId,
  };

  Exam.findByIdAndUpdate(id, dataUpdateExam).then((vaule) => res.json(vaule));
}

export const createExam = (req:Request, res: Response) => {
  const {name, examTime, doingExamTime, lecturerId, classId, examQuestions, moduleId} = req.body;

  const exam = new Exam({
    name, examTime, doingExamTime, lecturerId, classId, examQuestions, moduleId, finished: [],
  });

  exam.save().then((result) => {
    res.json(result);
  })
}

export const deleteExam = (req:Request, res: Response) => {
  Exam.findByIdAndDelete(req.params.id).then((data) => {
    res.json(data);
  });
}