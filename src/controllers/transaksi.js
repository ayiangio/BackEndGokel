const transaksi = require('../models/transaksi')
const miscHelper = require('../helpers/response')
const jwt = require('jsonwebtoken')

module.exports = {
    postTransaksi: (req, res) => {
        const { username_pembeli, username_pedagang } = req.body
        const data = {
            username_pembeli,
            username_pedagang,
            status: 0,
            total_harga: 0,
            jumlah: 0,
        }
        transaksi.postTransaksi(data)
            .then((resultTransaksi) => {
                const result = resultTransaksi
                miscHelper.response(res, data, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    detailTransaksiPembeli: (req, res) => {
        const username = req.params.username
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
        const username = req.params.username
        console.log(username)
        transaksi.detailTransaksiPenjual(username)
            .then((resultTransaksi) => {
                const result = resultTransaksi
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    updateTransaksi: (req, res) => {
        const username_pedagang = req.body.username_pedagang
        const username_pembeli = req.body.username_pembeli
        const data = {
            username_pedagang: req.body.username_pedagang,
            username_pembeli: req.body.username_pembeli,
            jumlah: req.body.jumlah,
            total_harga: req.body.total_harga,
        }
        transaksi.updateTransaksi(username_pembeli, username_pedagang, data)
            .then((resultTransaksi) => {
                const result = resultTransaksi
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    konfirmasi: (req, res) => {
        const username_pedagang = req.body.username_pedagang
        const username_pembeli = req.body.username_pembeli  
        const saldo = req.body.saldo      
        transaksi.konfirmasi(username_pembeli, username_pedagang,saldo)
            .then((resultTransaksi) => {
                const result = resultTransaksi
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    deleteTransaksi: (req, res) => {
        const username_pedagang = req.body.username_pedagang
        const username_pembeli = req.body.username_pembeli
        console.log(username_pedagang);
        console.log(username_pembeli);
        
        transaksi.deleteTransaksi(username_pembeli, username_pedagang)
            .then((resultTransaksi) => {
                const result = resultTransaksi
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    }
}