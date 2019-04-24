const Questions = require('../models/question')

module.exports = (req, res, next) => {
  Questions
    .findById({
      _id: req.params.id
    })
    .then((data) => {
      if (data.UserId != req.userData.id) {
        res.status(401).json({
          error: 'You are Unauthorized to update this data'
        })
      } else {
        next()
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message
      })
    })
}