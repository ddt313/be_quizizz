import mongoose from 'mongoose';
import { IChapter } from '../types';
import Module from './module';

const Schema = mongoose.Schema;

const chapterSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  moduleId: {
    type: Schema.Types.ObjectId,
    ref: Module,
    require: true,
  },
});

const Chapter = mongoose.model<IChapter>('Chapter', chapterSchema);

export default Chapter;
