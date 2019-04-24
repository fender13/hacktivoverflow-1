const router = require('express').Router()
const controller = require('../controllers/questionController')

const authentication = require('../middlewares/authentication')

// vote down check before update vote up 
const voteDownCheck = require('../middlewares/voteDownCheck')

// check if user already vote up before update push vote up
const checkVoteUpUsersExist = require('../middlewares/checkVoteUpUsersExist')

// vote up check before update vote down
const voteUpCheck = require('../middlewares/voteUpCheck')

// check if user already vote down before update push vote down
const checkVoteDownUserExist = require('../middlewares/checkVoteDownUsersExist')

// check if user is owner to update data
const questionUpdateAuthorization = require('../middlewares/questionUpdateAuthorization')

// create a question
router.post('/', authentication, controller.createQustions)

// get all questions
router.get('/', controller.getAllQuestions)

// get all user question
router.get('/user', authentication, controller.getUserQuestions)

// get one question
router.get('/:id', controller.getQuestion)

// add vote
router.post('/add-vote/:id', authentication, voteDownCheck, checkVoteUpUsersExist, controller.addVoteUp)

// reduce vote
router.post('/reduce-vote/:id', authentication, voteUpCheck, checkVoteDownUserExist, controller.addVoteDown)

// delete questions
router.delete('/:id', authentication, questionUpdateAuthorization, controller.deleteQuestion)

// update question
router.put('/:id', authentication, questionUpdateAuthorization, controller.updateQuestion)

module.exports = router