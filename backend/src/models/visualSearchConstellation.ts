import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const visualItemSchema = new mongoose.Schema({
    x: Number, // pozicija na gridu
    y: Number,
    isVisible: Boolean,
    color: String,
    orientation: String,
    isTarget: Boolean
}, { _id: false });

let RecreationVSData = new Schema({
  sessionId: { type: String, required: true },
  iteration: {type: Number, required: true},
  timestamp: { type: Date, default: Date.now },
  items: [visualItemSchema]
})

export default mongoose.model('RecreationVSData', RecreationVSData, 'vsRecreation');