const router = require('express').Router()
const controller = require('../controllers/userController')
const authentication = require('../middlewares/authentication')

// register a user
router.post('/register', controller.userRegister)

// login manual a user
router.post('/login', controller.userLogin)

// verify token
router.get('/verify', authentication, (req, res) => {
  res.status(200).json({
    message: 'User is verified',
    id: req.userData.id,
    username: req.userData.username,
    role: req.userData.role
  })
})

module.exports = router