const Tags = require('../models/tag')
const Watcheds = require('../models/watched')

class TagController {
  static getTagDataByName(req, res) {
    const tagName = req.params.tag

    Tags
      .findOne({
        tagName: tagName
      })
      .populate('QuestionId')
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        res.status(500).json({
          error: err
        })
      })
  }

  static saveWatchedTags(req, res) {
    const { tagId } = req.body

    Watcheds
      .findOne({
        UserId: req.userData.id
      })
      .then((data) => {
        const getId = { _id: data._id }

        return Watcheds
          .findOneAndUpdate(getId, 
            { "$push": { "TagId": tagId } },
            { "new": true, "upsert": true }
          )
          
      })
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json({
          error: err.message
        })
      })
  }

  static verifyTags(req, res) {
    const { tagId } = req.body

    Watcheds
      .findOne({
        UserId: req.userData.id
      })
      .then((data) => {
        let tagContainer = data.TagId
        let check = false

        if (tagContainer.length > 0) {
          for (let i = 0; i < tagContainer.length; i++) {
            if (tagContainer[i] == tagId) {
              check = true
            }
          }
  
          if (check == true) {
            res.status(200).json(data)
          } else {
            throw false
          }
        } else {
          throw false         
        }
      })
      .catch((err) => {
        res.status(500).json({
          error: err.message
        })
      })
  }

  static removeSavedTags(req, res) {
    const { tagId } = req.body
    const id = req.params.id
    const getId = { _id: id }

    Watcheds
      .findOne({
        UserId: req.userData.id
      })
      .then((data) => {
        return Watcheds
          .findOneAndUpdate(getId, 
            { "$pull": { "TagId": tagId } },
            { "new": true, "upsert": true }
          )
      })
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        res.status(500).json({
          error: err.message
        })
      })
  }

  static getUserWatchedTags(req, res) {
    Watcheds
      .findOne({
        UserId: req.userData.id
      })
      .populate('TagId')
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        res.status(500).json({
          error: err.message
        })
      })
  }
}

module.exports = TagController