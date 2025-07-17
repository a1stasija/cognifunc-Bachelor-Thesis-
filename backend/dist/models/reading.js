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
let ReadingData = new Schema({
    sessionId: { type: String, required: true },
    testName: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    events: [readingEventSchema]
});
exports.default = mongoose_1.default.model('ReadingData', ReadingData, 'reading');
