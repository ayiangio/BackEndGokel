require('dotenv').config()
const connection = require('../config/db')

module.exports = {
    registerPembeli: (dataUser, dataPembeli) => {
        // console.log("user ",dataUser)
        // console.log("pembeli ",dataPembeli)
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO pembeli SET ?', dataPembeli, (err, result) => {
                if (!err) {
                    connection.query('INSERT INTO user SET ?', dataUser)
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    registerPedagang: (dataUser, detaPedagang) => {
        // console.log("user ",dataUser)
        // console.log("pembeli ",dataPembeli)
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO pedagang SET ?', detaPedagang, (err, result) => {
                if (!err) {
                    connection.query('INSERT INTO user SET ?', dataUser)
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    getByUsername: (username) => {
        // console.log("user ",dataUser)
        // console.log("pembeli ",dataPembeli)
        // console.log(email)
        return new Promise((resolve, reject) => {
            connection.query('SELECT username, salt, password, role FROM user WHERE username = ?', username, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })

        })
    },
    getUserPembeli: (username) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM pembeli WHERE username = ?', username, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    getUserPedagang: (username) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM pedagang WHERE username = ?', username, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    updateToken: (username, token) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE user SET token = ? WHERE email =?`, [token, username], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    getUserPedagangByCategory: (username) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT id_pedagang, nama, username FROM pedagang INNER JOIN kategori ON pedagang.id_category = kategori.id_category where username = ?`, username, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}