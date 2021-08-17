"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const question_1 = require("../controllers/question");
const router = express_1.default.Router();
router.get('/', question_1.getQuestions);
router.post('/', question_1.createQuestion);
module.exports = router;
