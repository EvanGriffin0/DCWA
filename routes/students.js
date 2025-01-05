const express = require('express');
const router = express.Router();
const pool = require('../db/mysql');

router.get('/', async (req, res) => {
  try {
    const [students] = await pool.query('SELECT * FROM student ORDER BY sid');
    res.render('students', { students });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
