const express = require('express');
const { playersRouter } = require("./routers/playersRouter");
const app = express();
const http = require('http');
const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/players', playersRouter);

// app.use(express.static("/Quizzi/Quizzi/quizzi-client-side/css"));
// app.use(express.static("/Quizzi/Quizzi/quizzi-client-side/js"));

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/quizzi-client-side/index.html');
// });


// io.on('connection', (socket) => {
//     console.log("user connected:" + socket.id);
//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });
//     socket.on("message", (data) => {
//         socket.broadcast.emit('message', data)
//         socket.emit('message', data)
//     })
// });

app.use((req, res) => {
    res.send('WRONG URL')
});
    
app.listen(port, () => {
        console.log(`Listening on port ${port}...`)
});

// server.listen(port, () => {
//     console.log('Listening on port 3000...');
// });