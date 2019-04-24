const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const schema = mongoose.Schema

const WatchedTagSchema = new schema({
  UserId: {
    type: schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  TagId: [{
    type: schema.Types.ObjectId,
    ref: 'Tags'
  }]
})

var Watcheds = mongoose.model('Watcheds', WatchedTagSchema)

module.exports = Watcheds