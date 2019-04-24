const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const schema = mongoose.Schema

const QuestionSchema = new schema({
  title: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    ref: 'Tags'
  }],
  answer: [{
    type: schema.Types.ObjectId,
    ref: 'Answers'
  }],
  voteUp: [{
    type: schema.Types.ObjectId,
    ref: 'Users'
  }],
  voteDown: [{
    type: schema.Types.ObjectId,
    ref: 'Users'
  }],
  UserId: {
    type: schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  bestAnswer: {
    type: schema.Types.ObjectId,
    ref: 'Answers'
  },
  createdAt: {
    type: Date,
    required: true
  }
})

const Questions = mongoose.model('Questions', QuestionSchema)

module.exports = Questions