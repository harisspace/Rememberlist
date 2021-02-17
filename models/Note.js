const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  note: {
    type: String,
    required: true,
    default: ''
  },
  listId: {
    type: mongoose.Types.ObjectId,
    required: true
  }
}, { timestamps: true })

const Note = mongoose.model('Note', noteSchema)

module.exports = Note