"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const chapterSchema = new Schema({
    content: {
        type: String,
        require: true,
    },
    moduleId: {
        type: Schema.Types.ObjectId,
        ref: 'Module',
        require: true,
    },
});
const Chapter = mongoose_1.default.model('Chapter', chapterSchema);
exports.default = Chapter;
