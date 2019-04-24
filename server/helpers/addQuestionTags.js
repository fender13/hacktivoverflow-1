const Tag = require('../models/tag')

module.exports = (tagName, questionId) => {
  Tag
    .findOne({
      tagName: tagName
    })
    .then((data) => {
      if (!data) {
        return Tag
          .create({
            tagName: tagName,
            QuestionId: [questionId]
          })
      } else {
        const getId = { _id: data._id }
        let count = 0

        for (let i = 0; i < data.QuestionId.length; i++) {
          if (data.QuestionId[i] == questionId) {
            count++
          }
        }

        if (count > 0) {
          throw 'Question Sudah TERDAFTAR'
        } else {
          return Tag
            .findOneAndUpdate(getId, 
              { "$push": { "QuestionId": questionId } },
              { "new": true, "upsert": true }
            )
        }
      }
    })
    .then((data) => {
      console.log('Tag Has BEEN UPDATED')
    })
    .catch((err) => {
      console.log(err)
    })
}