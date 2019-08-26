require('dotenv').config();
const express = require('express');
const app = express();
const Cors = require('cors')
const xssFilter = require('x-xss-protection')
const port = process.env.PORT || 1010
const bodyPraser = require('body-parser')
// const user = require('./routes/user');
// const score = require('./routes/score');
const logger = require('morgan')
app.use(
	bodyPraser.urlencoded({
		extended: false
	})
);

app.use(Cors())
app.use(bodyPraser.json());
app.listen(port);
app.use(xssFilter())
console.log('Connect Succes On '+port);
app.use(logger('dev'))
app.use(logger('dev'))

//Route to endpoint
// user(app);
// score(app);