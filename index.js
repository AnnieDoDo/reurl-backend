const express = require('express');
const https = require('https');
const uniqueId = require('uniqid');
const Console = require('console');
// const { path } = require('path');
const sql = require('./db_functions');

const app = express();
const PORT = 3000;
const HOST = 'http://localhost';
const reurlQuery = '?reurl=';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const checkUrlValid = function UrlValid(url) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, (res) => {
      if (res.statusCode === 200) {
        resolve({ isValid: true });
      }
      resolve({ isValid: false });
    });

    req.on('error', (error) => {
      Console.error(error);
      reject(error);
    });
    req.end();
  });
};

app.get('/', (req, res) => {
  const originUrl = req.query.url;
  const key = uniqueId();
  const newUrl = HOST + PORT + reurlQuery + key;

  async function isUrlValid() {
    try {
      const UrlValid = await checkUrlValid(originUrl);
      if (UrlValid.isValid) {
        return true;
      }
      res.end('Invalid URL');
    } catch (err) {
      Console.log('catch', err);
      res.end('Invalid URL');
    }
    return false;
  }
  isUrlValid();

  if (!sql.createLink(originUrl, key)) {
    res.end('Fail to create link');
  }

  res.end(newUrl);
});

app.listen(PORT, () => {
  Console.log('Running on %d', PORT);
});
