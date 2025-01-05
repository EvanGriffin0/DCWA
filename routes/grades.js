const express = require('express');
const router = express.Router();
const pool = require('../db/mysql');

// GET /grades - Display all grades
router.get('/', async (req, res) => {
    try {
      const [grades] = await pool.query(`
        SELECT g.sid, g.mid, g.grade, s.name AS student_name
        FROM grade g
        JOIN student s ON g.sid = s.sid
        ORDER BY g.sid
      `);
      res.render('grades', { grades });
    } catch (error) {
      console.error('Error fetching grades:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  

module.exports = router;
