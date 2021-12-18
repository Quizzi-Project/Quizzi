const express = require('express');
const dotenv = require('dotenv');
const { playersRouter } = require("./routers/playersRouter");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/api/players', playersRouter);
// app.use('/api/');

app
    .use((req, res) => {
        res.send('WRONG URL')
    })
    .listen(port, () => {
        console.log(`Listening on port ${port}...`)
    });