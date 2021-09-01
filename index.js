const express = require('express');
const https = require('https');
const uniqueId = require('uniqid');
const Console = require('console');
const sql = require('./db_functions');

const app = express();
const PORT = 3000;
const HOST = 'http://localhost';
const reurlQuery = '?url=';

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
      res.end('Error: Invalid URL');
    } catch (err) {
      res.end('Error: Invalid URL');
    }
    return false;
  }
  isUrlValid();

  if (!sql.createLink(originUrl, key)) {
    res.end('Error: Fail to create link');
  }

  res.end(newUrl);
});

app.get('/redirect', (req, res) => {
  const key = req.query.urlkey;
  async function controlFlow() {
    try {
      const link = await sql.SearchLink(key);
      res.redirect(link.URL);
    } catch (e) {
      res.end('Error: Invalid link');
    }
  }
  controlFlow();
});

app.listen(PORT, () => {
  Console.log('Running on %d', PORT);
});
