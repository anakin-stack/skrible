const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

// Endpoint to handle the POST request with JSON payload
app.post('/api/paths', (req, res) => {
  console.log("response, body, req, res////////////////")
  const pathData = req.body
  // Function to convert path data to SVG
  function convertToSVG(pathData, width, height) {
    let svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '">';


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

  console.log(svgMarkup);


  // Print the SVG string


  // Send a response back to the client
  res.json({ message: 'Paths received successfully' });
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

// Example paths data
