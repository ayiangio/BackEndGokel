const userModel = require('../models/user')
const miscHelper = require('../helpers/response')
const jwt = require('jsonwebtoken')

module.exports = {
    getUserById: (req, res) => {
        const id_user = req.params.id_user
        console.log(id_user)
        userModel.getUserById(id_user)
            .then((resultUser) => {
                const result = resultUser
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    }
}