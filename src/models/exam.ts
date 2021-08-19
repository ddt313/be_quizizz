import mongoose, { Schema } from 'mongoose';
import Class from './class';
import ExamQuestion from './examQuestion';
import Module from './module';
import User from './user';

const examSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  examTime: {
    type: Date,
    require: true,
  },
  doingExamTime: {
    type: Number,
    require: true,
  },
  lecturerId: {
    type: mongoose.Types.ObjectId,
    ref: User,
    require: true,
  },
  classId: [{
    type: mongoose.Types.ObjectId,
    ref: Class,
    require: false,
  }],
  examQuestions: [
    {
      type: mongoose.Types.ObjectId,
      ref: ExamQuestion,
      require: false,
    }
  ],
  moduleId: {
    type: mongoose.Types.ObjectId,
    ref: Module,
    require: true,
  },
  finished: [
    {
      studentId: {
        type: mongoose.Types.ObjectId,
        ref: User,
        require: false,
      },
      score: {
        type: Number,
        require: false,
      },
    }
  ],
});

const Exam = mongoose.model('Exam', examSchema);

export default Exam;