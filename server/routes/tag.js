const router = require('express').Router()
const controller = require('../controllers/tagController')
const authentication = require('../middlewares/authentication')

// check if has wahtched 
const checkIfWatchedExist = require('../middlewares/checkIfWatchedTagsExist')

// check if tags already saved
const checkIfTagsSavedOnWatched = require('../middlewares/checkIfTagsSavedOnWatched')

// watched authorization
const watchedAuthorization = require('../middlewares/watchedAuthorization')

// get tag data by tagname
router.get('/:tag', controller.getTagDataByName)

// save a watched tag
router.post('/watched', authentication, checkIfWatchedExist, checkIfTagsSavedOnWatched, controller.saveWatchedTags)

// verify saved watched
router.post('/verify', authentication, controller.verifyTags)

// remove saved tags
router.post('/remove-tag/:id', authentication, watchedAuthorization, controller.removeSavedTags)

// get all saved watached
router.get('/', authentication, controller.getUserWatchedTags)

module.exports = router