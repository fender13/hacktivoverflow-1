const Answers = require('../models/answer')

module.exports = (req, res, next) => {
  const getId = { _id: req.params.id }

  Answers
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
            Answers.
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
        throw 'Answers not found'
      }
    })
    .catch((err) => {
      res.status(400).json({
        error: err
      })
    })
}