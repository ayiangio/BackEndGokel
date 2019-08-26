require('dotenv').config()
const connection = require('../config/db')

module.exports = {
    getUserByPedagang: (username) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM pedagang WHERE username = ?', id_user, (err, result) => {
                if(!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    getUserByPembeli: (id_user)
}