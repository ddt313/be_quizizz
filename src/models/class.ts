import mongoose, { Schema } from 'mongoose';
import Module from './module';
import Scholastic from './scholastic';
import User from './user';

const classSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  moduleId: {
    type: mongoose.Types.ObjectId,
    ref: Module,
    require: true,
  },
  scholasticId: {
    type: mongoose.Types.ObjectId,
    ref: Scholastic,
    require: false,
  },
  students: [
    {
      type: mongoose.Types.ObjectId,
      ref: User,
      require: true,
    }
  ],
  lecturerId: {
    type: mongoose.Types.ObjectId,
    ref: User,
    require: true,
  }
});

const Class = mongoose.model('Class', classSchema);

export default Class;