const express = require('express');
const app = express();

app.get('/health', (req, res) => {
  res.json({message: 'Hello, world!'});
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});