require('dotenv').config()
const connection = require('../config/db')

module.exports = {
    updateProfilePedagang: (id_pedagang, data) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE pedagang SET ? WHERE id_pedagang = ?', [data, id_pedagang], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    
}