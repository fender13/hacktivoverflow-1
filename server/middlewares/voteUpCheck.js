const Questions = require('../models/question')

module.exports = (req, res, next) => {
  const getId = { _id: req.params.id }

  Questions
    .findById(getId)
    .then((data) => {
      if (data) {
        const voteUp = data.voteUp

        if (voteUp.length == 0) {
          next()
        } else {
          let check = false

          for (let i = 0; i < voteUp.length; i++) {
            if (voteUp[i] == req.userData.id) {
              check = true
            }
          }
          
          if (check == false) {
            next()
          } else {
            Questions.
              findOneAndUpdate(getId, 
                  { "$pull": { "voteUp": req.userData.id } },
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