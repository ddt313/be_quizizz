import path from 'path';

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import questionRouter from './routes/question'
import examQuestionRouter from './routes/examQuestion';
import examRouter from './routes/exam';
import classRouter from './routes/class';
import studentRouter from './routes/student';
import authRouter from './routes/auth';
import chapterRouter from './routes/chapter';

import User from './models/user';
import Module from './models/module';
import Chapter from './models/chapter';

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors({origin: '*'}));

app.use('/auth', authRouter);
app.use('/questions', questionRouter);
app.use('/exam-questions', examQuestionRouter);
app.use('/modules', (req, res, next) => {
  Module.find((err, docs) => {
    res.json({
      statusCode: 200,
      payload: {
        modules: docs,
      },
    });
  });
});
app.use('/chapters', chapterRouter);

app.use('/exams', examRouter);
app.use('/classes', classRouter);
app.use('/student', studentRouter);

mongoose
  .connect('mongodb://127.0.0.1:27017/quizizz')
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: 'Max',
          email: 'max@test.com',
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(5001);
  })
  .catch((err) => {
    console.log(err);
  });
