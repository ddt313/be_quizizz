import { Request, Response } from "express";
import Exam from "../models/exam";

export const getContest = (req: Request, res: Response) => {
  const {studentId} = req.params;
  // const studentId = '6117dd2061f12dafa120eb68';

  console.log('studentId:', studentId);

  Exam.find()
    .populate({path: "classId", populate: {path: "students"}})
    .populate({path: "moduleId"})
    .populate({path: "examQuestions"})
    .exec((err, result: any) => {
      console.log(result);
      const data = result.filter((record: any) => record.examTime > new Date() && record.classId.some((cl: any) => cl.students.some((student: any) => student._id == studentId)));
      
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
      // res.json(result);
      // const data = result.filter((record: any) => record.examTime > new Date() && record.classId.some((cl: any) => cl.students.some((student: any) => student._id == studentId)));
      
      res.json({
        _id: result._id,
        name: result.name,
        module: result.moduleId.name,
        numberOfQuestions: result.examQuestions[0].questions.length,
        doingTimeExam: result.doingExamTime,
        examTime: result.examTime,
        examQuestions: result.examQuestions[0],
      });
    });
}