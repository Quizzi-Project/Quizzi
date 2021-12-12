const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app
    .use('/api/')
    .use('/api/');

app
    .use((req, res) => {
        res.send('WRONG URL')
    })
    .listen(port, () => {
        console.log(`Listening on port ${port}...`)
    });