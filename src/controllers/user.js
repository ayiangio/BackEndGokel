const user = require('../models/user')
const miscHelper = require('../helpers/response')
const jwt = require('jsonwebtoken')

module.exports = {
    getUserById: (req, res) => {
        const id_user = req.params.id_user
        console.log(id_user)
        user.getUserById(id_user)
            .then((resultUser) => {
                const result = resultUser
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    registerPembeli: async (req, res) => {
        const salt = miscHelper.getRandomSalt(25)
        const passHash = miscHelper.setPass(req.body.password, salt)
        let geturl = async (req) => {
            cloudinary.config({
                cloud_name: process.env.NAME,
                api_key: process.env.APIKEY,
                api_secret: process.env.APISECRET
            })

            let data
            await cloudinary.uploader.upload(path, (result) => {
                const fs = require('fs')
                fs.unlinkSync(path)
                data = result.url
            })

            return data
        }

        const dataPembeli = {
            email: req.body.email,
            nama: req.body.nama,
            username: req.body.username,
            no_hp: req.body.no,
            foto: "null",
        }
        const dataUser = {
            username: req.body.username,
            password: passHash.passwordHash,
            salt: passHash.salt,
            role: 'pembeli',
            token: "null"
        }
        user.getByUsername(req.body.username)
            .then((result) => {
                console.log(result.length)
                if (result.length > 0) {
                    console.log('masuk')
                    return miscHelper.response(res, null, 401, "Username Not Avaliable !!!")
                }
                else {
                    user.registerPembeli(dataUser, dataPembeli)
                        .then((resultUser) => {
                            console.log(resultUser)
                            miscHelper.response(res, resultUser, 200)
                        })
                        .catch((err) => {
                            console.log(err)
                            return miscHelper.response(res, null, 401, "Email Not Avaliable !!!")
                        })
                }

            })
            .catch((error) => {
                console.log(error)
            })

    },
    registerPedagang: async (req, res) => {
        const salt = miscHelper.getRandomSalt(25)
        const passHash = miscHelper.setPass(req.body.password, salt)
        let geturl = async (req) => {
            cloudinary.config({
                cloud_name: process.env.NAME,
                api_key: process.env.APIKEY,
                api_secret: process.env.APISECRET
            })

            let data
            await cloudinary.uploader.upload(path, (result) => {
                const fs = require('fs')
                fs.unlinkSync(path)
                data = result.url
            })

            return data
        }

        const dataPedagang = {
            email: req.body.email,
            nama: req.body.nama,
            username: req.body.username,
            no_hp: req.body.no,
            foto: "null",
            id_jajan: req.body.id_jajan,
            id_category: req.body.id_category,
        }
        const dataUser = {
            username: req.body.username,
            password: passHash.passwordHash,
            salt: passHash.salt,
            role: 'pedagang',
            token: "null"
        }
        user.getByUsername(req.body.username)
            .then((result) => {
                console.log(result.length)
                if (result.length > 0) {
                    console.log('masuk')
                    return miscHelper.response(res, null, 401, "Username Not Avaliable !!!")
                }
                else {
                    user.registerPedagang(dataUser, dataPedagang)
                        .then((resultUser) => {
                            console.log(resultUser)
                            miscHelper.response(res, resultUser, 200)
                        })
                        .catch((err) => {
                            console.log(err)
                            return miscHelper.response(res, null, 404, "Email Not Avaliable !!!")
                        })
                }

            })
            .catch((error) => {
                console.log(error)
            })

    },
    login: (req, res) => {
        const username = req.body.username
        const pass = req.body.password
        console.log(username)
        user.getByUsername(username)
            .then((result) => {
                const dataUser = result[0]
                console.log(result)
                const userPass = miscHelper.setPass(pass, dataUser.salt).passwordHash
                if (userPass === dataUser.password) {
                    dataUser.token = jwt.sign({
                        idUser: dataUser.idUser
                    }, process.env.SECRET_KEY, {
                            expiresIn: '120h'
                        })

                    delete dataUser.salt
                    delete dataUser.password
                    return miscHelper.response(res, dataUser, 200)
                } else {
                    return miscHelper.response(res, null, 403, "Wrong Password !!!")
                }
            })
            .catch((err) => {
                console.log(err)
                return miscHelper.response(res, null, 403, "Email Not Register !!!")
            })
    },
    getUserPembeli: (res, req) => {
        const username = req.params.username
        user.getUserPedagang(username)
            .then((resultUser) => {
                const result = resultUser
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    getUserPedagang: (res, req) => {
        const username = req.params.username
        user.getUserPembeli((username))
            .then((resultUser) => {
                const result = resultUser
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    }
}