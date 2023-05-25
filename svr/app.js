const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Declare a variable to store svgMarkup
app.locals.svgMarkup = '';

// Endpoint to handle the POST request with JSON payload
app.post('/api/paths', (req, res) => {
  const pathData = req.body;

  // Function to convert path data to SVG
  function convertToSVG(pathData, width, height) {
    let svg = '<svg  id="svgContainer"  xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '">';

    // Loop through each path object and generate the corresponding SVG path element
    for (let i = 0; i < pathData.length; i++) {
      const path = pathData[i];
      svg += '<path fill="' + path.color + '" d="' + path.d + '" />';
    }

    svg += '</svg>';

    return svg;
  }

  // Call the function to convert the path data to SVG markup
  const svgMarkup = convertToSVG(pathData, 600, 1000);

  // Save svgMarkup to app.locals
  app.locals.svgMarkup = svgMarkup;

  console.log(svgMarkup);

  // Send a response back to the client
  res.json({ message: 'Paths received successfully' });
});

// Example endpoint to retrieve the svgMarkup from app.locals
app.get('/api/svgMarkup', (req, res) => {
  // Retrieve svgMarkup from app.locals
  const svgMarkup = app.locals.svgMarkup;
  res.send(svgMarkup);
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
