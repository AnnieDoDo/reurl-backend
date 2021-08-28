const express = require('express');
const https = require('https');
const uniqueId = require('uniqid');
const Console = require('console');

const app = express();
const PORT = 3000;
const HOST = 'http://localhost';
const reurlQuery = '?reurl=';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function checkUrlValid(url) {
  const req = https.request(url, (res) => {
    Console.log(`statusCode: ${res.statusCode}`);
  });

  req.on('error', (error) => {
    Console.error(error);
  });

  req.end();
}

app.get('/', (req, res) => {
  const originUrl = req.query.url;
  const newUrl = HOST + PORT + reurlQuery + uniqueId();
  checkUrlValid(originUrl);
  Console.log(originUrl);
  res.end(newUrl);
});

app.listen(PORT, () => {
  Console.log('Running on %d', PORT);
});
