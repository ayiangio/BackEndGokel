require('dotenv').config();
const express = require('express');
const app = express();
const Cors = require('cors')
const xssFilter = require('x-xss-protection')
const port = process.env.PORT || 3333
const bodyPraser = require('body-parser')
//const config = require('config-yml')
const userRouter = require('./src/routes/user');
const transaksiRouter = require('./src/routes/transaksi');
// const score = require('./routes/score');
const logger = require('morgan')

const redis = require('redis')
const REDIS_PORT = process.env.PORT_REDIST || 6379
const client = redis.createClient(REDIS_PORT)


app.use(
	bodyPraser.urlencoded({
		extended: true
	})
);
client.on("error", function (err) {
    console.log("Error " + err);
});
app.use(Cors())
app.use(bodyPraser.json());
//console.log(config.app.url)
// app.use(express.static(__dirname + './uploads'))
app.listen(port);
app.use(xssFilter())
console.log('Connect Succes On '+port);
app.use(logger('dev'))
app.use(logger('dev'))

app.use('/user', userRouter)
app.use('/transaksi', transaksiRouter)


//Route to endpoint
// user(app);
// score(app);
