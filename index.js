const express = require('express');

const app = express();

// Replace '*' with your desired allowed origin(s)
const allowedOrigin = '*';

app.get('*', (req, res) => {
  const targetUrl = req.url.slice(1); // Remove leading slash

  fetch(targetUrl)
    .then(response => response.json())
    .then(data => {
      res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
      res.setHeader('Access-Control-Allow-Methods', 'GET');
      res.setHeader('Access-Control-Allow-Headers', req.headers['content-type']); // Reflect original headers
      res.json(data);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error fetching data');
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server listening on port ${port}`));

module.exports = app;
