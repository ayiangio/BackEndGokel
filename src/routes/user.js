var express = require('express')
var router = express.Router()
const userController = require('../controllers/user')
const Auth = require('../helpers/auth')
const multer = require('multer');

	const storage = multer.diskStorage({
		filename: function (req, file, cb) {
			cb(null, file.originalname);
		}
	})
	let upload = multer({ storage: storage, limits: { fileSize: 100000000 } })
router
    .all('/*', Auth.authInfo)
    // .get('/', userController.getUserById)
    .post('/register/pembeli', userController.registerPembeli)//req body data
    .post('/register/pedagang', userController.registerPedagang)//req body data
    .post('/login', userController.login)//req body username dan password
    .get('/pedagang', userController.getUserPedagang)//req body username
    .get('/pembeli', userController.getUserPembeli)//req body username
    .patch('/pembeli/:username',upload.single('image'), userController.updateUserPembeli)
    .patch('/pedagang/:username', upload.single('image'),userController.updateUserPedagang)

module.exports = router