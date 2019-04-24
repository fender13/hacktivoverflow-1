const mongoose = require('mongoose')

const schema = mongoose.Schema

const AnswerSchema = new schema({
  answer: {
    type: String,
    required: true
  },
  QuestionId: {
    type: schema.Types.ObjectId,
    ref: 'Questions',
    required: true
  },
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
  createdAt: {
    type: Date,
    required: true
  }
})

const Answers = mongoose.model('Answers', AnswerSchema)

module.exports = Answers