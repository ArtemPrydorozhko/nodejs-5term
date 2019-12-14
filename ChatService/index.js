const express = require('express');
const config = require('./config/config');
const app = require('./socket').app;
const auth = require('./app/routes/middleware/auth');
const server = require('./socket').server;
const io = require('./socket').io;

const sequelize = require('./app/database/connection/sequelize');

app.use(express.json());

const chatRoutes = require('./app/routes/api/chat');
const groupChatRoutes = require('./app/routes/api/groupChat');

app.use(auth);
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: 'invalid token' });
    }
});

app.use('/api/chatservice', chatRoutes);
app.use('/api/chatservice', groupChatRoutes);

io.on('connection', (socket) => {
    // redis -> online status
    const chats = []; // from redis
    const groupChats = []; // from redis
    chats.forEach((chat) => {
        socket.join(chat);
    });
    groupChats.forEach((chat) => {
        socket.join(chat);
    });

    socket.on('join chat', (data) => {
        // add to redis
        const id = data.id.toString();
        socket.join(id);
    });

    socket.on('leave chat', (data) => {
        // add to redis
        const id = data.id.toString();
        socket.leave(id);
    });

    socket.on('disconnect', () => {
        // redis -> offline st    
    });
});

sequelize.sync().then(() => {
    server.listen(config.chatPort, () => {
        console.log('ChatService started');
    });
}).catch(err => console.log(err));