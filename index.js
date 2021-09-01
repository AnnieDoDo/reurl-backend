const express = require('express');
const https = require('https');
const uniqueId = require('uniqid');
const Console = require('console');
const sql = require('./db_functions');
const { CreateLink } = require('./db_functions');

const app = express();
const PORT = 3000;
const HOST = 'http://localhost';
const reurlQuery = '?url=';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const CheckUrlValid = function UrlValid(url) {
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

  async function controlFlow() {
    try {
      const urlValid = await CheckUrlValid(originUrl);
      try {
        const keyByUrl = await sql.GetKeyByUrl(originUrl);
        if (urlValid.isValid) {
          if (keyByUrl.KEY) {
            res.end(HOST + PORT + reurlQuery + keyByUrl.KEY);
          }
        }
      } catch (error) {
        const key = uniqueId();
        const link = await CreateLink(originUrl, key);

        if (link) {
          res.end(HOST + PORT + reurlQuery + key);
        } else {
          res.end('Error: Fail to create link');
        }
      }
    } catch (err) {
      res.end('Error: Invalid URL');
    }
    return false;
  }
  controlFlow();
});

app.get('/redirect', (req, res) => {
  const key = req.query.urlkey;
  async function controlFlow() {
    try {
      const link = await sql.GetUrlByKey(key);
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
