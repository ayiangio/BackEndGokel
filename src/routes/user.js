var express = require('express')
var router = express.Router()
const userController = require('../controllers/user')
const Auth = require('../helpers/auth')
const Chace = require('../helpers/chace')
const multer = require('multer');
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        console.log('masuk doang');

        cb(null, file.originalname);
    }
})
let upload = multer({ storage: storage, limits: { fileSize: 100000000 } })
// ,upload.single('image')
// Chace.getChace("getPedagang")
// Chace.getChace('getPembeli'),
// Chace.getChace('getKategori'), 
// function chace(req)
router
    .all('/*', Auth.authInfo)
    .post('/register/pembeli', Chace.delChace,userController.registerPembeli)
    .post('/register/pedagang', userController.registerPedagang)
    .post('/login', userController.login)
    .get('/pedagang/:username',  userController.getUserPedagang)
    .get('/pembeli/:username',Chace.getChace, userController.getUserPembeli)
    .patch('/pembeli/:username',Chace.delChace, upload.single('foto'), userController.updateUserPembeli)
    .patch('/pedagang/:username', upload.single('foto'), userController.updateUserPedagang)
    .get('/pedagang/kategori/:id_category',  Chace.getChace,userController.getUserByCategory)
    .get('/detailpedagang/:username',userController.getDetailPedagang)
    .patch('/updatesaldo/:username', userController.updateSaldo)
    .get('/jajan', userController.getAllJajan)

module.exports = router
