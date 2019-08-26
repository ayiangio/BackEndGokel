var express = require('express')
var router = express.Router()
const userController = require('../controllers/user')
const Auth = require('../helpers/auth')

router
    .all('/*', Auth.authInfo)
    .get('/', userController.getUserByPedagang)
    .get('/pedagang/:username', userController.getUserByPedagang)
    
    

module.exports = router