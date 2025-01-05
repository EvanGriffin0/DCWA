const express = require('express');
const router = express.Router();
const LecturerModel = require('../models/lecturer'); // MongoDB model
const pool = require('../db/mysql'); // MySQL connection pool

// Handle Delete Lecturer
router.get('/delete/:lid', async (req, res) => {
  const { lid } = req.params;

  try {
    // Check if the lecturer is associated with any module in MySQL
    const [modules] = await pool.query('SELECT * FROM module WHERE lecturer = ?', [lid]);

    if (modules.length > 0) {
      // Lecturer is associated with modules
      const lecturers = await LecturerModel.find().sort({ _id: 1 }); // Sort lecturers alphabetically
      return res.render('lecturers', {
        error: `Cannot delete Lecturer ${lid} as they are associated with modules.`,
        lecturers,
      });
    }

    // Lecturer is not associated with any module; proceed with deletion in MongoDB
    await LecturerModel.findByIdAndDelete(lid);

    res.redirect('/lecturers');
  } catch (error) {
    console.error('Error deleting lecturer:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Render Lecturers Page
router.get('/', async (req, res) => {
  try {
    const lecturers = await LecturerModel.find().sort({ _id: 1 }); // Sort lecturers alphabetically
    res.render('lecturers', { lecturers, error: null });
  } catch (error) {
    console.error('Error fetching lecturers:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
