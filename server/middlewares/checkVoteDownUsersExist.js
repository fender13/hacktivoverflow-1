const Questions = require('../models/question')

module.exports = (req, res, next) => {
  const getId = { _id: req.params.id }

  Questions
    .findById(getId)
    .then((data) => {
      if (data) {
        const voteDown = data.voteDown
        let check = false

        for (let i = 0; i < voteDown.length; i++) {
          if (voteDown[i] == req.userData.id) {
            check = true
          }
        }
        
        if (check == false) {
          next()
        } else {
          throw 'You already Vote Down for this Questions'
        }
      } else {
        throw 'Questions not found'
      }
    })
    .catch((err) => {
      res.status(400).json({
        error: err
      })
    })

}