import mongoose from "mongoose";

export interface IModule {
  name: string
};

export interface IChapter {
  name: string,
  moduleId: string,
};

type Answer = {
  // id: string,
  content: string,
  isTrue: boolean,
};

export interface IQuestion {
  _id: mongoose.Types.ObjectId,
  content: string,
  chapterId: string,
  answers: Answer[],
  level: number,
  userId: string,
  dateCreate: Date,
}

export interface IUser {
  name: string,
  emal: string,
  password: string,
}

export interface IExamQuestion {
  _id: mongoose.Types.ObjectId,
  content: string,
  moduleId: string,
  questions: string[],
  userId: string,
  dateCreate: Date,
}