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
            connection.query('SELECT jumlah, total_harga, status, username_pedagang as pedagang FROM transaksi  WHERE username_pembeli = ?', username, (err, result) => {
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
            connection.query('SELECT jumlah, total_harga, status, username_pembeli as pembeli FROM transaksi  WHERE username_pedagang = ?', username, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    updateTransaksi: (username_pembeli,username_pedagang,data)=>{
        return new Promise((resolve, reject) => {
            connection.query('UPDATE transaksi SET ? where username_pembeli = ? and username_pedagang = ? and status = 0', [data,username_pembeli,username_pedagang], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    konfirmasi: (username_pembeli,username_pedagang,saldo)=>{
        return new Promise((resolve, reject) => {
            connection.query('UPDATE transaksi SET status = 1 where username_pembeli = ? and username_pedagang = ? and status = 0', [username_pembeli,username_pedagang], (err, result) => {
                if (!err) {
                    connection.query(`UPDATE pedagang set saldo = ? where username = ? `,[saldo,username_pedagang])
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    deleteTransaksi: (username_pembeli,username_pedagang)=>{

        console.log(username_pembeli);
        console.log(username_pedagang);
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM transaksi where username_pembeli = ? and username_pedagang = ? and status = 0', [username_pembeli,username_pedagang], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
}