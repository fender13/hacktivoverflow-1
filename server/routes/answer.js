const router = require('express').Router()
const controller = require('../controllers/answerController')

const authentication = require('../middlewares/authentication')

// check if user already vote down an answer
const voteDownAnswerCheck = require('../middlewares/voteDownAnswerCheck')

// check if user already vote up an answer before update push vote up an answer
const checkVoteUpUsersExist = require('../middlewares/checkVoteUpAnswerUsersExist')

// check if user already vote up an answer
const voteUpAnswerCheck = require('../middlewares/voteUpAnswerCheck')

// check if user already vote down an answer before update push vote down an answer
const checkVoteDownUsersExist = require('../middlewares/checkVoteDownAnswerUsersExist')

// check if user who delete an answer is question owner
const checkQuestionOwnerAnswerBeforeDeleteAnswer = require('../middlewares/checkQuestionAnswerOwnerBeforeDeleteAnswer')

// remove answer id from question model array answer
const removeAnswerFromArrayQuestionsBeforeDelete = require('../middlewares/removeAnswerFromArrayQuestionsBeforeDelete')

// update answer owner authorization
const answerUpdateAuthorization = require('../middlewares/answerUpdateAuthorization')

// post an answer
router.post('/:id', authentication, controller.createAnswer)

// add vote
router.post('/add-vote/:id', authentication, voteDownAnswerCheck, checkVoteUpUsersExist, controller.addVoteUp)

// reduce vote
router.post('/reduce-vote/:id', authentication, voteUpAnswerCheck, checkVoteDownUsersExist, controller.addVoteDown)

// delete answer
router.delete('/:id', authentication, checkQuestionOwnerAnswerBeforeDeleteAnswer, removeAnswerFromArrayQuestionsBeforeDelete, controller.deleteAnswer)

// get an answer for update answer
router.get('/:id', authentication, answerUpdateAuthorization, controller.getAnswer)

// update an answer
router.put('/:id', authentication, answerUpdateAuthorization, controller.updateAnswer)


module.exports = router