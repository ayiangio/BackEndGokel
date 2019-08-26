require('dotenv').config()
const connection = require('../config/db')

module.exports = {
    getUserById: (id_user) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM user WHERE id_user = ?', id_user, (err, result) => {
                if(!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}