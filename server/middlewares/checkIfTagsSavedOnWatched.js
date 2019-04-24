const Watcheds = require('../models/watched')

module.exports = (req, res, next) => {
  const { tagId } = req.body

  Watcheds
    .findOne({
      UserId: req.userData.id
    })
    .then((data) => {
      let tagContainer = data.TagId

      if (tagContainer.length == 0) {
        next()
      } else {
        let check = false

        for (let i = 0; i < tagContainer.length; i++) {
          if (tagContainer[i] == tagId) {
            check = true
          }
        }

        if (check == true) {
          res.status(400).json({
            error: 'Tag sudah tersimpan di Watched'
          })
        } else {
          next()
        }
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        error: err.message
      })
    })
}