const express = require('express')
const Route = express.Router()
const transaksi = require('../controllers/transaksi')
const Auth = require('../helpers/auth')

Route

    .all('/*', Auth.authInfo)
    .post('/', transaksi.postTransaksi)
    .get('/transaksipembeli', transaksi.detailTransaksiPembeli)
    .get('/transaksipenjual', transaksi.detailTransaksiPenjual)

module.exports = Route