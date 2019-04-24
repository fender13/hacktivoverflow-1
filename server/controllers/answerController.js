const Answers = require('../models/answer')
const Questions = require('../models/question')

class AnswerController {
  static createAnswer(req, res) {
    const QuestionId = req.params.id
    const { answer } = req.body
    let answerData

    Answers
      .create({
        answer: answer,
        QuestionId: QuestionId,
        UserId: req.userData.id,
        createdAt: new Date()
      })
      
      .then((data) => {
        answerData = data
        return Questions
          .findOneAndUpdate(QuestionId,
            { "$push": { "answer": data._id } },
            { "new": true, "upsert": true }
          )
      })
      .then((data) => {
        Answers
          .findById({
            _id: answerData._id
          })
          .populate('UserId')
          .then((data) => {
            res.status(201).json(data)
          })
      })
      .catch((err) => {
        res.status(500).json({
          error: err
        })
      })
  }

  static addVoteUp(req, res) {
    const id = req.params.id
    const getId = { _id: id }

    Answers
      .findOneAndUpdate(getId, 
        { "$push": { "voteUp": req.userData.id } },
        { "new": true, "upsert": true }
      )
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        res.status(500).json({
          error: err.message
        })
      })
  } 

  static addVoteDown(req, res) {
    const id = req.params.id
    const getId = { _id: id }

    Answers
      .findOneAndUpdate(getId, 
        { "$push": { "voteDown": req.userData.id } },
        { "new": true, "upsert": true }
      )
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        res.status(500).json({
          error: err.message
        })
      })
  }

  static deleteAnswer(req, res) {
    const id = req.params.id
    const getId = { _id: id }

    Answers
      .findByIdAndDelete(getId)
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        res.status(500).json({
          error: err.message
        })
      })
  }

  static getAnswer(req, res) {
    const id = req.params.id
    const getId = { _id: id }

    Answers
      .findById(getId)
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        res.status(500).json({
          error: err.message
        })
      })
  }

  static updateAnswer(req, res) {
    const { answer } = req.body
    const id = req.params.id
    const getId = { _id: id }

    Answers
      .findOneAndUpdate(getId, {
        answer: answer
      })
      .then((data) => {
        Answers
          .findById({
            _id: data._id
          })   
          .populate('UserId')
          .then((data) => {
            res.status(200).json(data)
          })
      })
      .catch((err) => {
        res.status(500).json({
          error: err.message
        })
      })
  }
}

module.exports = AnswerController