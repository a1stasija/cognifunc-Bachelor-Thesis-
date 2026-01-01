import mongoose from 'mongoose'

const Schema = mongoose.Schema;


let RecreationFData = new Schema({
  sessionId: { type: String, required: true },
  iteration: {type: Number, required: true},
  timestamp: { type: Date, default: Date.now },
  stimulus: [{type: String, required: true}]
})

export default mongoose.model('RecreationFData', RecreationFData, 'fRecreation');