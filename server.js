const express = require('express');
const { playersRouter } = require("./routers/playersRouter");
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');
// const { Server } = require("socket.io");
// const io = new Server(server);
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     res.set('Content-Type', 'application/json');
//     next();
// });

app.use(express.json());

app.use('/api/players', playersRouter);

app.use('/', express.static(path.join(__dirname, 'quizzi-client-side')));

app.post('/quiz.html', (req, res) => {
    res.sendFile('/quizzi-client-side/quiz.html', {root: __dirname});
});

app.get('/', (req, res) => {
    res.sendFile('/quizzi-client-side/index.html', {root: __dirname});
});

app.use((req, res) => {
    res.send('WRONG URL')
});
    
app.listen(port, () => {
        console.log(`Listening on port ${port}...`);
});