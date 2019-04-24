const Answers = require('../models/answer')

module.exports = (req, res, next) => {
  const getId = { _id: req.params.id }

  Answers
    .findById(getId)
    .populate({
      path: 'QuestionId'
    })
    .then((data) => {

      if (!data) {
        res.status(401).json({ 
          error: 'You are Unauthorized to delete this data'
        })
      } else {
        const questionOwner = data.QuestionId.UserId.toString()
        const answerOwner = data.UserId.toString()

        if (questionOwner == req.userData.id) {
          next()   
        } else if (answerOwner == req.userData.id) {
          next()
        } else {
          res.status(401).json({ 
            error: 'You are Unauthorized to delete this data'
          })
        }
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(400).json({
        error: err
      })
    })
}