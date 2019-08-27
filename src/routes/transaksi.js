const express = require('express')
const Route = express.Router()
const transaksi = require('../controllers/transaksi')
const Auth = require('../helpers/auth')

Route

    .all('/*', Auth.authInfo)
    .post('/', transaksi.postTransaksi)
    .patch('/update', transaksi.updateTransaksi)
    .delete('/delete', transaksi.deleteTransaksi)
    .get('/transaksipembeli/:username', transaksi.detailTransaksiPembeli)
    .get('/transaksipedagang/:username', transaksi.detailTransaksiPenjual)

module.exports = Route