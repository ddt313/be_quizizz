import mongoose, { Schema } from 'mongoose';

const scholasticSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
});

const Scholastic = mongoose.model('Scholastic', scholasticSchema);

export default Scholastic;