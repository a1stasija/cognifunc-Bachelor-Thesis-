"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const readingEventSchema = new mongoose_1.default.Schema({
    x: Number,
    y: Number,
    stamp: Number
}, { _id: false });
let VisualSearchData = new Schema({
    sessionId: { type: String, required: true },
    iteration: { type: Number, required: true },
    isCorrect: { type: Boolean, required: true },
    isControl: { type: Boolean, required: true },
    reactionTime: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
    events: [readingEventSchema]
});
exports.default = mongoose_1.default.model('VisualSearchData', VisualSearchData, 'visualSearch');
