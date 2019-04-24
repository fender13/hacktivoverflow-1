const cron = require('node-cron')
const kue = require('kue')
const Questions = require('../models/question')
const mail = require('./mail')
const queue = kue.createQueue()

module.exports = () => {
  cron.schedule('00 06 * * 6', () => {
    Questions
      .find()
      .populate('UserId')
      .then(function (allQuestion) {
        allQuestion.forEach(e => {
          let text = `Hello, ${e.userId.email}!<br>
            Your question for "${e.title}" has commented for ${e.comments.length} time(s).<br>
            Also your question been upvoted for ${e.upvotes.length} time(s) and downvoted for ${e.downvotes.length} time(s).<br>
            Thank you!`
          let email = e.userId.email
          queue.create('email', {
            email,
            text
          }).save()
        });
      })
      .catch(function (err) {
        console.log(err)
      })
    queue.process('email', function (job, done) {
      mail(job.data.email, job.data.text)
      done()
    })
  })
} 