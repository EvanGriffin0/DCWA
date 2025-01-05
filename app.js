// Import required modules
const express = require('express'); // Import express first
const studentRoutes = require('./routes/students');

// Initialize the app
const app = express(); 

// Middleware for parsing JSON 
app.use(express.json());

// Define routes
app.use('/students', studentRoutes);

// Start the server
const PORT = 3004;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory 
const path = require('path');
app.set('views', path.join(__dirname, 'views'));

// Define the home route
app.get('/', (req, res) => {
    res.render('home');
  });
  
