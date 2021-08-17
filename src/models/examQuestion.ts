import mongoose, { Schema } from 'mongoose';
import { IExamQuestion } from '../types';
import Module from './module';
import Question from './question';
import User from './user';

const examQuestionSchema = new Schema({
  content: {
    type: String,
    require: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: User,
    require: true,
  },
  moduleId: {
    type: mongoose.Types.ObjectId,
    ref: Module,
    require: true,
  },
  dateCreate: {
    type: Date,
    require: false,
  },
  questions: [
    {
      type: mongoose.Types.ObjectId,
      ref: Question,
      require: true,
    }
  ],
});

const ExamQuestion = mongoose.model<IExamQuestion>('ExamQuestion', examQuestionSchema);

export default ExamQuestion;