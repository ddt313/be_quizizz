'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
Object.defineProperty(exports, '__esModule', {value: true});
exports.createQuestion = exports.getQuestions = void 0;
const mongoose_1 = __importDefault(require('mongoose'));
const question_1 = __importDefault(require('../models/question'));
const getQuestions = (req, res, next) => {
  question_1.default
    .find()
    .populate('userId', 'name')
    .populate({
      path: 'chapterId',
      populate: {path: 'moduleId', select: 'name'},
    })
    .then((data) => {
      res.json({data: data});
      // res.json({
      //   statusCode: 200,
      //   payload: {
      //     questions: questions.map(async (question) => ({
      //       _id: question._id,
      //       question: question.content,
      //       level: question.level,
      //       user: (await User.findById(question.userId))?.name,
      //       module: (await Module.findById(question._id))
      //     })),
      //   },
      // });
    });
};
exports.getQuestions = getQuestions;
const createQuestion = (req, res, next) => {
  const question = new question_1.default({
    content: req.body.content,
    chapterId: new mongoose_1.default.Types.ObjectId(req.body.chapterId),
    answers: req.body.answers,
    level: req.body.level,
    userId: new mongoose_1.default.Types.ObjectId(req.body.userId),
    dateCreate: req.body.dateCreate,
  });
  question.save().then((result) => {
    res.json({status: 200, result: result});
  });
};
exports.createQuestion = createQuestion;
