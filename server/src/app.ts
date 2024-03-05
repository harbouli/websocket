import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';

const app = express();
const port = 3030;

const server = http.createServer(app);

app.use(cors({
    origin: "http://localhost:5174"
}));

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: false,
    } 
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log(msg)
        io.emit('chat message', msg);
    });
    
});

app.get('/api', (req, res) => {
    res.send('Hello World!');
});

server.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
