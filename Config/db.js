const mysql      = require('mysql2');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Rifaldisetyawan',
  database : 'chat_app_server',
  port     : '3306'
});

module.exports = connection;