const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Endpoint to handle the POST request with JSON payload
app.post('/api/paths', (req, res) => {
  console.log("response, body, req, res////////////////")
  const paths = req.body;

  // Process the paths data as needed
  // For example, you can log the paths to the console
  console.log('Received paths:', paths);

  // Send a response back to the client
  res.json({ message: 'Paths received successfully' });
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

