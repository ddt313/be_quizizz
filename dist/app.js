'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
Object.defineProperty(exports, '__esModule', {value: true});
const path_1 = __importDefault(require('path'));
const express_1 = __importDefault(require('express'));
const mongoose_1 = __importDefault(require('mongoose'));
const cors_1 = __importDefault(require('cors'));
const app = express_1.default();
app.set('view engine', 'ejs');
app.set('views', 'views');
const questionRouter = require('./routes/question');
const user_1 = __importDefault(require('./models/user'));
const module_1 = __importDefault(require('./models/module'));
const chapter_1 = __importDefault(require('./models/chapter'));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(express_1.default.json());
// app.use((req, res, next) => {
//   User.findById('60fbc4ee9f69bc36540e79a0')
//     .then((user) => {
//       req.user = user;
//       next();
//     })
//     .catch((err) => console.log(err));
// });
app.use(cors_1.default({origin: '*'}));
app.use('/questions', questionRouter);
app.use('/modules', (req, res, next) => {
  module_1.default.find((err, docs) => {
    res.json({
      statusCode: 200,
      payload: {
        modules: docs,
      },
    });
  });
});
app.use('/chapters/:id', (req, res, next) => {
  const id = req.params.id;
  chapter_1.default.find({moduleId: id}).then((data) => {
    res.json({
      statusCode: 200,
      payload: {
        chapters: data,
      },
    });
  });
});
mongoose_1.default
  .connect('mongodb://127.0.0.1:27017/quizizz')
  .then((result) => {
    user_1.default.findOne().then((user) => {
      if (!user) {
        const user = new user_1.default({
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
