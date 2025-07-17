import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const readingEventSchema = new mongoose.Schema({
  x: Number,
  y: Number,
  stamp: Number
}, { _id: false });

let ReadingData = new Schema({
  sessionId: { type: String, required: true },
  testName: {type: String, required: true},
  timestamp: { type: Date, default: Date.now },
  events: [readingEventSchema]
})

export default mongoose.model('ReadingData', ReadingData, 'reading');