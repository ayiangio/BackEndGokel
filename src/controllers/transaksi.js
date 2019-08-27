const transaksi = require('../models/transaksi')
const miscHelper = require('../helpers/response')
const jwt = require('jsonwebtoken')

module.exports = {
    postTransaksi: (req, res) => {
        const { jumlah, total_harga, status } = req.body
        const data = {
            jumlah, 
            total_harga, 
            status, 
            username: 'null', 
            role: 'pembeli'
        }
        transaksi.postTransaksi(data)
            .then((resultTransaksi) => {
                const result = resultTransaksi
                miscHelper.response(res, result, 200, data)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    detailTransaksiPembeli: (req, res) => {
        const username = req.body.username
        console.log(username)
        transaksi.detailTransaksiPembeli(username)
            .then((resultTransaksi) => {
                const result = resultTransaksi
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    detailTransaksiPenjual: (req, res) => {
        const username = req.body.username
        console.log(username)
        transaksi.detailTransaksiPenjual(username)
            .then((resultTransaksi) => {
                const result = resultTransaksi
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    }
}