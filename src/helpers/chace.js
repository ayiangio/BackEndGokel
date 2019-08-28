const MiscHelper = require('../helpers/response')
const redis = require('redis')
const REDIS_PORT = process.env.PORT_REDIST || 6379
const client = redis.createClient(REDIS_PORT)
module.exports = {
    setChace: (key, data) => {
        console.log(key)
        client.setex(key, 36000, JSON.stringify(data))
    },
    delChace: (req, res, next) => {
        const chace = req.headers['chace']
        client.del(chace)
        next()
    },
    getChace: (req, res, next) => {
        // console.log(res)
        const chace = req.headers['chace']
        client.get(chace, (err, data) => {
            // console
            if (err) throw err

            if (data !== null) {
                return MiscHelper.response(res, JSON.parse(data), 200)
            }
            else {
                next()
            }
        })
    },
}