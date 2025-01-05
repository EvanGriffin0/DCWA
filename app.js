const express = require('express');
const app = express();
const path = require('path');
const studentRoutes = require('./routes/students');

//styles folder
app.use(express.static(path.join(__dirname, 'styles')))

// Middleware for parsing request bodies and serving static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up the template engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Register the /students route
app.use('/students', studentRoutes);

app.get('/', (req, res) => {
  res.render('home');
});

const gradeRoutes = require('./routes/grades');
app.use('/grades', gradeRoutes);

const lecturersRouter = require('./routes/lecturers'); 
app.use('/lecturers', lecturersRouter);

// Start the server
const PORT = 3004;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
