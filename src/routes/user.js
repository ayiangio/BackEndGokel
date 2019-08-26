var express = require('express')
var router = express.Router()
const userController = require('../controllers/user')
const Auth = require('../helpers/auth')
const multer = require('multer');

	const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            console.log('masuk dest');
            
			cb(null, '../uploads/images')
		},
		filename: function (req, file, cb) {
            console.log('masuk doang');

			cb(null, file.originalname);
		}
	})
    let upload = multer({ storage: storage, limits: { fileSize: 100000000 } })
    // ,upload.single('image')
router
    .all('/*', Auth.authInfo)
    .post('/register/pembeli', userController.registerPembeli)
    .post('/register/pedagang', userController.registerPedagang)
    .post('/login', userController.login)
    .get('/pedagang', userController.getUserPedagang)
    .get('/pembeli', userController.getUserPembeli)
    .patch('/pembeli/:username', userController.updateUserPembeli)
    .patch('/pedagang/:username', userController.updateUserPedagang)

module.exports = router