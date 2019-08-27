var express = require('express')
var router = express.Router()
const userController = require('../controllers/user')
const Auth = require('../helpers/auth')
const multer = require('multer');
const path = require('path')

	const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            console.log('masuk dest');
            
			cb(null, 'uploads/')
		},
		filename: function (req, file, cb) {
            console.log('masuk doang');

			cb(null, file.originalname);
		}
	})
    let upload = multer({ storage: storage })
    // ,upload.single('image')
router

    .all('/*', Auth.authInfo)
    .post('/register/pembeli', userController.registerPembeli)
    .post('/register/pedagang', userController.registerPedagang)
    .post('/login', userController.login)
    .get('/pedagang', userController.getUserPedagang)
    .get('/pembeli', userController.getUserPembeli)
    .patch('/pembeli/:username', upload.single('image'), userController.updateUserPembeli)
    // .patch('/pedagang/:username', userController.updateUserPedagang)
    .get('/pedagang/:id_category', userController.getUserByCategory)
    .get('/detailpedagang', userController.getDetailPedagang)

module.exports = router