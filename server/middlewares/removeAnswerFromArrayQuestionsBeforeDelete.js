const Answers = require('../models/answer')
const Questions = require('../models/question')

module.exports = (req, res, next) => {
  const id = req.params.id
  const getId = { _id: id }

  Answers
    .findById(getId)
    .then((data) => {
      const getId = { _id: data.QuestionId}

      return Questions
      .findOneAndUpdate(getId, 
        { "$pull": { "answer": req.params.id } },
        { "new": true, "upsert": true }
      )
    })
    .then((data) => {
      // console.log(data)
      next()
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message
      })
    })
}