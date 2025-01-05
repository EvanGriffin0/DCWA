const express = require('express');
const router = express.Router();
const pool = require('../db/mysql');

// GET /students - Display all students
router.get('/', async (req, res) => {
  try {
    const [students] = await pool.query('SELECT * FROM student ORDER BY sid');
    res.render('students', { students });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/add', async (req, res) => {
  const { sid, name, age } = req.body;

  // Input Validation
  const errors = [];
  if (!sid || sid.length !== 4) errors.push('Student ID should be 4 characters');
  if (!name || name.length < 2) errors.push('Name should be at least 2 characters');
  if (!age || age < 18) errors.push('Age should be at least 18');

  if (errors.length > 0) {
    return res.render('addStudent', { error: errors.join(', '), student: { sid, name, age } });
  }

  try {
    const [existingStudent] = await pool.query('SELECT * FROM student WHERE sid = ?', [sid]);
    if (existingStudent.length > 0) {
      return res.render('addStudent', { error: `Student ID ${sid} already exists`, student: { sid, name, age } });
    }

    // Insert the new student
    await pool.query('INSERT INTO student (sid, name, age) VALUES (?, ?, ?)', [sid, name, age]);
    res.redirect('/students');
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Render Add Student Form
router.get('/add', (req, res) => {
  res.render('addStudent', { error: null, student: {} });
});


module.exports = router;
