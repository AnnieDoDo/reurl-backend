const express = require('express');

const app = express();
const PORT = 3000;
const HOST = 'localhost';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/' , (req, res) => {
    res.end('haha');
});

app.listen(PORT, () => {
    console.log(`Running on ${PORT}`);
});