import { Request, Response } from "express";
import Class from "../models/class";

export const getListNameClass = (req: Request, res: Response) => {
  Class.find().then((data: any) => {
    res.json(data.map((c) => {
      return {
        _id: c._id,
        name: c.name,
      }
    }))
  });
};

export const getClasses = (req: Request, res: Response) => {
  const {lectureId} = req.params;

  Class.find({lecturer: lectureId})
    .populate("moduleId")
    .then((docs) => {
      res.json(docs.map((result: any) => ({
        _id: result._id,
        name: result.name,
        module: result.moduleId.name,
        numberOfStudents: result.students.length,
      }))
    )});
};

export const createClass = (req: Request, res: Response) => {
  const newClassCreate = new Class({
    name: req.body.name,
    moduleId: req.body.moduleId,
    students: req.body.students,
    lecturerId: req.body.lecturerId,
  });

  newClassCreate.save().then((data) => res.json(data));
};
