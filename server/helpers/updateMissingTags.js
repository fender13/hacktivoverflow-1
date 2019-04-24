const Tag = require('../models/tag')

module.exports = (missingTag, questionId) => {
  let findTag = {
    tagName: missingTag
  }

  Tag
    .findOneAndUpdate(findTag, 
      { "$pull": { "QuestionId": questionId } },
      { "new": true, "upsert": true }  
    )
    .then((data) => {
      console.log(data, 'missing tag has been updated')
    })
    .catch((err) => {
      console.log(err)
    })
}