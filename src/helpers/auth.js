const jwt = require('jsonwebtoken')
const MiscHelper = require('../helpers/response')

const allowedAccess = process.env.REQUEST_HEADERS || 'khusni'

module.exports = {
    authInfo: (req, res, next) => {
        const headerAuth = req.headers['authorization']
        const headerSecret = req.headers['x-access-token']
        console.log('headerAuth '+headerAuth);
        console.log('allowedAccess11 '+allowedAccess);
        
        if (headerAuth !== allowedAccess) {
          return MiscHelper.response(res, null, 401, 'Unauthorized, Need authentication !')
        } else if (typeof headerSecret === 'undefined') { 
          next()
        } else {
          const bearerToken = headerSecret.split(' ')
          const token = bearerToken[1]
          req.token = token
          console.log('Token stored!' + token)
          next()
        }
      },
    
      accesstoken: (req, res, next) => {
        const secretKey = process.env.SECRET_KEY || 'indonesiakutanahtumpahdarahku'
        const accessToken = req.token
        console.log(req.token);
        const userToken = req.headers['x-control-user']
        // console.log(userToken);
        jwt.verify(accessToken, secretKey, (err, decoded) => {
          // console.log(decoded.userid);
          if (err && err.name === 'TokenExpiredError') return MiscHelper.response(res, null, 401, 'Token expired')
    
          if (err && err.name === 'JsonWebTokenError') return MiscHelper.response(res, null, 401, 'Invalid Token')
    
          if (parseInt(userToken) !== parseInt(decoded.userid)) return MiscHelper.response(res, null, 401, 'Invalid User Token')
          console.log(decoded)
          next()
        })
    }
}