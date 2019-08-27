//post transasksi ( untuk transaksi )
//get detail transaksi (untuk transaksi pembeli )
//get detail transaksi (untuk transaksi penjual )

require('dotenv').config()
const connection = require('../config/db')

module.exports = {
    postTransaksi: (data) => {
        return new Promise((resolve, reject) =>  {
            connection.query('INSERT INTO transaksi SET ?', data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    detailTransaksiPembeli: (username) =>  {  
        return new Promise((resolve, reject) => {
            connection.query('SELECT transaksi.jumlah, transaksi.total_harga, transaksi.status, pembeli.nama, pembeli.no_hp FROM transaksi INNER JOIN pembeli ON transaksi.username = pembeli.username WHERE transaksi.username = ?', username, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    detailTransaksiPenjual: (username) =>  {  
        return new Promise((resolve, reject) => {
            connection.query('SELECT transaksi.jumlah, transaksi.total_harga, transaksi.status, pedagang.nama, pedagang.no_hp FROM transaksi INNER JOIN pedagang ON transaksi.username = pedagang.username WHERE transaksi.username = ?', username, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}