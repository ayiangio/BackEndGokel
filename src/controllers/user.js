const userModel = require('../models/user')
const miscHelper = require('../helpers/response')
const jwt = require('jsonwebtoken')

module.exports = {
    getUserByPedagang: (req, res) => {
        const username = req.params.username
        console.log(username)
        userModel.getUserByPedagang(username)
            .then((resultUser) => {
                const result = resultUser
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    getUserByPembeli: (req, res) => {
        const username = req.params.username
        console.log(username)
        userModel.getUserByPembeli(username)
            .then((resultUser) => {
                const result =
            })
    }
}