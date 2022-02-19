const express = require('express');
const app = express();
const logger = require('./config/logger');
const port = process.env.PORT || 3001;
app.use(express.json());
const cors = require('cors')
const { playersRouter } = require("./routers/playersRouter");
app.use(cors());

app
    .use('/api/players', playersRouter)
    .use('/api/users', playersRouter)

app
    .use((req, res) => {
        res.send('WRONG URL')
    })
    .listen(port, () => {
        console.log(`Listening on port ${port}...`);
    });

