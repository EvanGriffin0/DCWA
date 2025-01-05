const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost', 
  user: 'root',     
  password: 'password', 
  database: 'proj2024mysql', 
});


module.exports = pool;

