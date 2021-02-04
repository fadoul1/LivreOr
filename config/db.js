let mysql = require('mysql');
let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'fad',
    password : 'fad',
    database : 'tuto'
})

connection.connect()

module.exports = connection