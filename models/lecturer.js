const mongoose = require('mongoose');
const dbURL = 'mongodb://localhost:27017/proj2024';

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

const LecturerSchema = new mongoose.Schema({
  _id: String,
  name: String,
  did: String,
});

const LecturerModel = mongoose.model('Lecturer', LecturerSchema);

module.exports = LecturerModel;
