import { Request, Response } from "express";
import Exam from "../models/exam";

export const getContest = (req: Request, res: Response) => {
  const {studentId} = req.params;

  Exam.find()
    .populate({path: "classId", populate: {path: "students"}})
    .populate({path: "moduleId"})
    .populate({path: "examQuestions"})
    .exec((err, result: any) => {
      const data = result
        .filter((record: any) => !record.finished.some((f) => f.studentId.toString() === studentId) && record.examTime > new Date() && record.classId.some((cl: any) => cl.students.some((student: any) => student._id == studentId)));
      
      res.json(data.map((d) => ({
        _id: d._id,
        name: d.name,
        module: d.moduleId.name,
        numberOfQuestions: d.examQuestions[0].questions.length,
        doingTimeExam: d.doingExamTime,
        examTime: d.examTime,
      })))
    });
}

export const getContestById = (req: Request, res: Response) => {
  const {contestId} = req.params;

  Exam.findById(contestId)
    .populate({path: "classId", populate: {path: "students"}})
    .populate({path: "moduleId"})
    .populate({path: "examQuestions", populate: {path: "questions"}})
    .exec((err, result: any) => {
      const index = Math.floor(Math.random() * result.examQuestions.length);
      res.json({
        _id: result._id,
        name: result.name,
        module: result.moduleId.name,
        numberOfQuestions: result.examQuestions[index].questions.length,
        doingTimeExam: result.doingExamTime,
        examTime: result.examTime,
        examQuestions: result.examQuestions[index],
      });
    });
}

export const finishedContest = (req: Request, res: Response) => {
  const {studentId, score, examId} = req.body;

  Exam.findByIdAndUpdate(examId, {$push: {finished: {studentId: studentId, score: +score}}})
    .then((result) => {
      console.log(result);
      res.json(result);
    });
};

export const getFinishedContest = (req: Request, res: Response) => {
  const {studentId} = req.params;

  Exam.find()
    .populate({path: "classId", populate: {path: "students"}})
    .populate({path: "moduleId"})
    .populate({path: "examQuestions"})
    .exec((err, result: any) => {
      const data = result
        .filter((record: any) => record.finished.some((f) => f.studentId.toString() === studentId) && record.examTime > new Date() && record.classId.some((cl: any) => cl.students.some((student: any) => student._id == studentId)));
      
      res.json(data.map((d) => ({
        _id: d._id,
        name: d.name,
        module: d.moduleId.name,
        numberOfQuestions: d.examQuestions[0].questions.length,
        doingTimeExam: d.doingExamTime,
        examTime: d.examTime,
        score: d.finished.find((st) => st.studentId.toString() === studentId).score,
      })))
    });
};