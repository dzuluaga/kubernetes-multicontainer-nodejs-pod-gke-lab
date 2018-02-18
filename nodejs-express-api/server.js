'use strict';

const express = require('express'),
  request = require('request');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/hello', (req, res) => {
  if (req.header('Skip-Backend')) {
    return res.send('Hello world-API\n');
  }
  request('http://localhost:8081')
    .on('error', (err) => {
      res.send('backend not reachable at the moment on localhost.');
    })
    .pipe(res);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
