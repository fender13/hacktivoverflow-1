const Questions = require('../models/question')

const addQuestionTags = require('../helpers/addQuestionTags')
const updateMissingTags = require('../helpers/updateMissingTags')
const saveCreateTags = require('../helpers/saveCreateTags')

class QuestionController {
  static createQustions(req, res) {
    const { title, question, tags } = req.body

    Questions
      .create({
        title: title,
        question: question,
        tags: tags,
        UserId: req.userData.id,
        bestAnswer: null,
        createdAt: new Date()
      })
      .then((data) => {
        for (let i = 0; i < data.tags.length; i++) {
          addQuestionTags(data.tags[i], data._id)
        }
        
        res.status(201).json(data)
      })
      .catch((err) => {
        res.status(500).json({
          error: err.message
        })
      })
  }

  static getAllQuestions(req, res) {
    Questions
      .find()
      .then((data) => { 
        res.status(200).json(data)
      })
      .catch((err) => {
        res.status(500).json({
          error: err.message
        })
      })
  }

  static getUserQuestions(req, res) {
    Questions
      .find({
        UserId: req.userData.id
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

  static getQuestion(req, res) {
    Questions
      .findById({
        _id: req.params.id
      })
      .populate('UserId')
      .populate({
        path: 'answer',
        populate: {
          path: 'UserId'
        }
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

  static addVoteUp(req, res) {
    const id = req.params.id
    const getId = { _id: id }

    Questions
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

    Questions
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

  static deleteQuestion(req, res) {
    const id = req.params.id
    const getId = { _id: id }

    Questions
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

  static updateQuestion(req, res) {
    const { title, tags, question } = req.body
    const getId = { _id: req.params.id }
    let questionData

    Questions
      .findById(getId)
      .then((data) => {
        questionData = data

        return Questions
          .findByIdAndUpdate(getId, {
            title: title,
            tags: tags,
            question: question
          })
      })
      .then((newData) => {
        let missing = []

        for (let i = 0; i < questionData.tags.length; i++) {
          let same = false
          for (let j = 0; j < tags.length; j++) {
            if (questionData.tags[i] == tags[j]) {
              same = true
              tags.splice(j, 1)
            } 
          }
          if (same == false) {
            missing.push(questionData.tags[i])
          }
        }
        
        if (missing.length > 0 || tags.length > 0) {
          if (missing.length > 0) {
            for (let i = 0; i < missing.length; i++) {
              updateMissingTags(missing[i], questionData._id)
            }
          }

          if (tags.length > 0) {
            for (let i = 0; i < tags.length; i++) {
              saveCreateTags(tags[i], questionData.id)
            }
          }
        } 

        res.status(200).json(newData)
      })
      .catch((err) => {
        res.status(400).json({
          message: err
        })
      })
  }
}

module.exports = QuestionController