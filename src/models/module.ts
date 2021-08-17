import mongoose, { Schema } from 'mongoose';
import { IModule } from '../types';

const moduleSchema = new Schema<IModule>({
  name: {
    type: String,
    require: true,
  },
});

const Module = mongoose.model<IModule>('Module', moduleSchema);

export default Module
