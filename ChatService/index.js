const express = require('express');
const config = require('./config/config');
const app = require('./socket').app;
const auth = require('./app/routes/middleware/auth');
const server = require('./socket').server;
const io = require('./socket').io;
const cors = require('cors');

io.origins('*:*');

const sequelize = require('./app/database/connection/sequelize');

app.use(cors());
app.use(express.json());

const chatRoutes = require('./app/routes/api/chat');
const groupChatRoutes = require('./app/routes/api/groupChat');
const socketHandler = require('./app/routes/api/chatSocket');
const messageRoutes = require('./app/routes/api//message');

app.use(auth);
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: 'invalid token' });
    }
});

app.use('/api/chatservice', chatRoutes);
app.use('/api/chatservice', groupChatRoutes);
app.use('/api/chatservice', messageRoutes);

io.of('/api/chatservice').on('connection', socketHandler);
sequelize.sync().then(() => {
    server.listen(config.chatPort, () => {
        console.log('ChatService started');
    });
}).catch(err => console.log(err));

module.exports = app;