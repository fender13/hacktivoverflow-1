const Watcheds = require('../models/watched')

module.exports = (req, res, next) => {
  Watcheds
    .findOne({
      UserId: req.userData.id
    })
    .then((data) => {
      if (data) {
        next()
      } else {
        Watcheds
          .create({
            UserId: req.userData.id
          })
          .then((data) => {
            next()
          })
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message
      })
    })
}