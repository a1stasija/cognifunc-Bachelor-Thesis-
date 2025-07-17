import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const readingEventSchema = new mongoose.Schema({
  x: Number,
  y: Number,
  stamp: Number
}, { _id: false });

let FlankerData = new Schema({
  sessionId: { type: String, required: true },
  iteration: {type: Number, required: true},
  isCorrect: { type: Boolean, required: true},
  reactionTime: {type: Number, required:true},
  timestamp: { type: Date, default: Date.now },
  events: [readingEventSchema]
})

export default mongoose.model('FlankerData', FlankerData, 'flanker');