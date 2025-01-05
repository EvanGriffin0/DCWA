const mysql = require('mysql2/promise');

(async () => {
  const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'proj2024mysql',
  });

  try {
    const [rows] = await pool.query('SELECT * FROM student');
    console.log(rows);
  } catch (error) {
    console.error('Connection failed:', error);
  }
})();
