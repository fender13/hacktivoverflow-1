const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const schema = mongoose.Schema

const TagSchema = new schema({
  tagName: {
    type: String,
  },
  QuestionId: [{
    type: schema.Types.ObjectId,
    ref: 'Questions'
  }]
})

var Tags = mongoose.model('Tags', TagSchema)

module.exports = Tags