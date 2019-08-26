var express = require('express')
var router = express.Router()
const userController = require('../controllers/user')
const Auth = require('../helpers/auth')

router
    .all('/*', Auth.authInfo)
    // .get('/', userController.getUserById)
    .post('/register/pembeli', userController.registerPembeli)
    .post('/register/pedagang', userController.registerPedagang)
    .post('/login', userController.login)
    .get('/pedagang', userController.getUserPedagang)
    .get('/pembeli', userController.getUserPembeli)
    .patch('/pembeli/:username', userController.updateUserPembeli)
    .patch('/pedagang/:username', userController.updateUserPedagang)

module.exports = router