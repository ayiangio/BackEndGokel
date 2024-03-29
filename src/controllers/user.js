const user = require('../models/user')
const miscHelper = require('../helpers/response')
const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary')

const Chace = require('../helpers/chace')

module.exports = {
    registerPembeli: async (req, res) => {
        const salt = miscHelper.getRandomSalt(25)
        const passHash = miscHelper.setPass(req.body.password, salt)
        const dataPembeli = {
            email: req.body.email,
            nama: req.body.nama,
            username: req.body.username,
            no_hp: req.body.no,
            foto: 'https://image.flaticon.com/icons/png/512/97/97895.png',
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
        console.log(req.body)
        const dataPedagang = {
            email: req.body.email,
            nama: req.body.nama,
            username: req.body.username,
            no_hp: req.body.no,
            foto: 'https://image.flaticon.com/icons/png/512/97/97895.png',
            id_jajan: req.body.id_jajan,
            id_category: req.body.id_category,
            stok: 0,
            harga: 0,
            saldo: 0

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
                    user.updateToken(username, dataUser.token)
                        .then((result) => {
                            console.log(result)
                        })
                        .catch((err) => {
                            console.log(err)
                        })
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

    getUserPedagang: (req, res) => {
        console.log(req.body.username)
        const username = req.params.username
        user.getUserPedagang(username)
            .then((resultUser) => {
                const result = resultUser
                // Chace.setChace('getPendagang',result)
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    getUserPembeli: (req, res) => {
        console.log(req.body.username);
        const username = req.params.username
        user.getUserPembeli(username)
            .then((resultUser) => {
                const result = resultUser
                Chace.setChace('pembeli',result)
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    updateUserPedagang: async (req, res) => {
        const username = req.params.username
        let path = null
        let alamat = null
        // console.log(req.file);
        if (req.file == undefined){
            alamat = req.body.foto
        }
        else {
            path =req.file.path
        }
        // user.getUserPedagang((username))
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

        let photo = null 
        if (req.file === undefined){
            photo  = alamat
        }
        else{
            photo = await geturl()
        }
        const dataPedagang = {
            email: req.body.email,
            nama: req.body.nama,
            username: req.body.username,
            no_hp: req.body.no,
            foto: photo,
        }
        user.updateUserPedagang(username, dataPedagang)
            .then((resultUser) => {
                const result = resultUser
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                return miscHelper.response(res, null, 403, "Email/Username Not Available !!!")
            })
    },
    updateUserPembeli: async (req, res) => {
        const username = req.params.username
        let path = null
        let link = null
        if (req.file == undefined){
            link = req.body.foto
        }
        else {
            path =req.file.path
        }
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
        let photo = null 
        if (req.file === undefined){
            photo  = link
        }
        else{
            photo = await geturl()
        }
        const dataPembeli = {
            email: req.body.email,
            nama: req.body.nama,
            username: req.body.username,
            no_hp: req.body.no,
            foto: photo,
        }
        user.updateUserPembeli(username, dataPembeli)
            .then((resultUser) => {
                const result = resultUser
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                return miscHelper.response(res, null, 403, "Email/Username Not Available !!!")                
            })
    },
    getUserByCategory: (req, res) => {
        const id_category = req.params.id_category
        console.log(req.params)
        user.getUserByCategory(id_category)
            .then((resultUser) => {
                const result = resultUser
                // Chace.setChace('getKategori',result)
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    getAllJajan: (req, res) => {
        user.getAllJajan()
            .then((resultUser) => {
                const result = resultUser
                // Chace.setChace('getJajan',result)
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    getDetailPedagang: (req, res) => {
        const username = req.params.username
        console.log(req.body.username)
        user.getDetailPedagang(username)
            .then((resultUser) => {
                const result = resultUser
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    updateSaldo: (req, res) => {
        const username = req.params.username
        const saldo = req.body.saldo
        console.log(username)
        user.updateSaldo(username, saldo)
            .then((resultUser) => {
                const result = resultUser
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    updateStock: (req, res) => {
        const username = req.params.username        
        const data = {
            harga :req.body.harga,
            stok : req.body.stok
        }
        console.log(data)
        user.updateStock(username, data)
            .then((resultUser) => {
                const result = resultUser
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    getAllPedagang: (req, res) => {
        user.getAllPedagang()
        .then((resultUser) => {
            const result = resultUser
            // Chace.setChace('getJajan',result)
            miscHelper.response(res, result, 200)
        })
        .catch((error) => {
            console.log(error)
        })
    }
}
