const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Luisgon10$',
    database: 'store'
});

module.exports = connection;