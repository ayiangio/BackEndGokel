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
            connection.query(`UPDATE user SET token = ? WHERE username =?`, [token, username], (err, result) => {
                if (!err) {
                   resolve(result)
                } else {
                   reject(new Error(err))
                }
              })
          })
    },
    updateUserPedagang: (username,data) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE pedagang SET ? where username = ?',[data, username], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    updateUserPembeli: (username,data) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE pembeli SET ? where username = ?',[data, username], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    getUserByCategory: (id_category) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM pedagang WHERE id_category = ?', id_category, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}