require('dotenv').config()
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'remotemysql.com',
    user: process.env.DB_USER || 'B3VNLxDsdv',
    password: process.env.DB_PASS || 'OR52AjyikW',
    database: process.env.DB_NAME || 'B3VNLxDsdv',
    port: process.env.PORT || '3306'
})

connection.connect((err) => {
    if (err) console.log(`Error: ${err}`);    
})

module.exports = connection