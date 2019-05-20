const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Room = new Schema({
  buildID: { type: String },
  roomID: [{ type: String }],
  maxStudent: [{ type: Number }],
  type: [{ type: String }],
  status: [{ type: String }]
},
  {
    collection: 'room'
  })

module.exports = mongoose.model('Room', Room)