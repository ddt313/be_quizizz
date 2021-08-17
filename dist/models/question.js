"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const questionSchema = new Schema({
    content: {
        type: String,
        require: true,
    },
    chapterId: {
        type: Schema.Types.ObjectId,
        ref: 'Chapter',
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
        ref: 'User',
        require: true,
    },
    dateCreate: {
        type: Date,
        require: false,
    },
});
const Question = mongoose_1.default.model('Question', questionSchema);
exports.default = Question;
