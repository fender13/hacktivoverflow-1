const Questions = require('../models/question')

module.exports = (req, res, next) => {
  const getId = { _id: req.params.id }

  Questions
    .findById(getId)
    .then((data) => {
      if (data) {
        const voteDown = data.voteDown

        if (voteDown.length == 0) {
          next()
        } else {
          let check = false

          for (let i = 0; i < voteDown.length; i++) {
            if (voteDown[i] == req.userData.id) {
              check = true
            }
          }

          if (check == false) {
            next()
          } else {
            Questions.
              findOneAndUpdate(getId, 
                  { "$pull": { "voteDown": req.userData.id } },
                  { "new": true, "upsert": true }
                )
                .then((data) => {
                  next()
                })
          }
        }
      } else {
        throw 'Questions not found'
      }
    })
    .catch((err) => {
      res.status(400).json({
        error: err.message
      })
    })
}