const mongoose = require('mongoose')

const mylistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    lowercase: true
  },
  category: {
    type: String,
    required: true,
    lowercase: true
  },
  level: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  isDone: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

const Mylist = mongoose.model('Mylist', mylistSchema)

module.exports = Mylist
