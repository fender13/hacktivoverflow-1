const Tag = require('../models/tag')

module.exports = (tag, questionId) => {
  Tag
    .findOne({
      tagName: tag
    })
      .then((data) => {
        if (data) {
          const getId = { _id: data._id }

          return Tag
            .findOneAndUpdate(getId, 
              { "$push": { "QuestionId": questionId } },
              { "new": true, "upsert": true }
                
            )
        } else {
          return Tag
            .create({
              tagName: tag,
              QuestionId: [questionId]
            })
        }
      })
      .then((newTagData) => {
        console.log('Tag Has Created')
      })
      .catch((err) => {
        console.log(err)
      })
}