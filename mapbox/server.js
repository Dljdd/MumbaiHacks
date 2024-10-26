const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());

app.use(express.json());

app.post('/api/coordinates', (req, res) => {
  const { latitude, longitude } = req.body;
  console.log(`Received coordinates: ${latitude}, ${longitude}`);

  // Handle the coordinates here (e.g., store them in a database, send them to a service, etc.)
  // For this example, we'll just log them to the console
  console.log('API response:', { latitude, longitude });

  res.status(201).send({ message: 'Coordinates received successfully' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});