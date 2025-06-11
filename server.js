const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

function generateData(sizeInBytes) {
  return Buffer.alloc(sizeInBytes, 'a');
}

app.get('/file/:size', (req, res) => {
  const size = req.params.size;
  let bytes;
  if (size === '10kb') bytes = 10 * 1024;
  else if (size === '100kb') bytes = 100 * 1024;
  else if (size === '1mb') bytes = 1024 * 1024;
  else return res.status(400).send('Invalid size parameter');

  if (Math.random() < 0.2) {
    return res.status(500).send('Simulated server error');
  }

  const ext = req.query.format === 'txt' ? 'txt' : 'html';
  const data = generateData(bytes);

  res.set('Content-Type', ext === 'txt' ? 'text/plain' : 'text/html');
  res.send(data);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});