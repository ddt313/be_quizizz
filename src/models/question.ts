import mongoose from 'mongoose';
import { IQuestion } from '../types';
import Chapter from './chapter';
import User from './user';

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  content: {
    type: String,
    require: true,
  },
  chapterId: {
    type: Schema.Types.ObjectId,
    ref: Chapter,
    require: true,
  },
  answers: [
    {
      id: {
        type: Schema.Types.ObjectId,
        require: true,
      },
      content: {
        type: String,
        require: true,
      },
      isTrue: {
        type: Boolean,
        require: true,
      },
    },
  ],
  level: {
    type: Number,
    require: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: User,
    require: true,
  },
  dateCreate: {
    type: Date,
    require: false,
  },
});

const Question = mongoose.model<IQuestion>('Question', questionSchema);

export default Question;
