const Watcheds = require('../models/watched')

module.exports = (req, res, next) => {
  Watcheds
    .findOne({
      _id: req.params.id
    })
    .then((data) => {
      if (data.UserId == req.userData.id) {
        next()
      } else {
        res.status(401).json({
          error: "Dilarang Update Watch Orang Lain"
        })
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        error: err.message
      })
    })
}