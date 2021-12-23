const express = require('express');
const { playersRouter } = require("./routers/playersRouter");
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');
const port = process.env.PORT || 3000;

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
    res.send('WRONG URL');
});
    
app.listen(port, () => {
        console.log(`Listening on port ${port}...`);
});