const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001; // Use a different port than your React app

app.use(bodyParser.json());

app.post('/api/coordinates', (req, res) => {
  const { latitude, longitude } = req.body;
  console.log(`Received coordinates: ${latitude}, ${longitude}`);
  
  // Here you would typically process the coordinates and return a response
  // For now, we'll just echo back the coordinates
  res.json({ message: 'Coordinates received', latitude, longitude });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

