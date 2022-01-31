const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
const { playersRouter } = require("./routers/playersRouter");

app
    .use('/api/players', playersRouter);

app
    .use((req, res) => {
        res.send('WRONG URL')
    })
    .listen(port, () => {
        console.log(`Listening on port ${port}...`);
    });



// const express = require('express');
// const { playersRouter } = require("./routers/playersRouter");
// const app = express();
// const http = require('http');
// const server = http.createServer(app);
// const path = require('path');
// const port = process.env.PORT || 3000;

// app.use(express.json());

// app.use('/api/players', playersRouter);

// app.use((req, res) => {
//     res.send('WRONG URL');
// });
    
// app.listen(port, () => {
//         console.log(`Listening on port ${port}...`);
// });