const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Enable CORS for all routes (you can also configure it for specific routes)
app.use(cors());



let uri = 'mongodb+srv://Bhuwan:Bhuban45332@cluster0.vbqayks.mongodb.net/?retryWrites=true&w=majority'
// Connect to MongoDB
mongoose.connect(uri);

// Handle MongoDB connection events
mongoose.connection.on('connected', () => {
  console.log('Connected to the database');
});

mongoose.connection.on('error', (err) => {
  console.error('Failed to connect to the database:', err);
});

// Set up body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define a MongoDB model (schema)
const FormSubmission = mongoose.model('FormSubmission', {
  name: String,
  email: String,
  type: String,
  additional: String,
});
app.get('/submit-form', (req, res) => {
    // Handle the GET request for the form, if needed
    res.status(200).send('This is the form page');
  });
  
// Define a route to handle form submissions
app.post('/submit-form',  async (req, res) => {
  const { name, email, type, additional } = req.body;

  // Create a new document in the MongoDB collection
  const  submission = new FormSubmission({
    name,
    email,
    type,
    additional,
  });
  try {
  
  await submission.save();
  res.status(200).json({ message: 'Form submitted successfully' }); // Return JSON response
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Failed to save the submission' }); // Return JSON response
}
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
