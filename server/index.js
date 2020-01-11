const express = require('express');
const app = require('./socket').app;
require('dotenv').config({path: '../.env'});
const config = require('./config/config');
const auth = require('./app/routes/middleware/auth');
const server = require('./socket').server;
const io = require('./socket').io;
const cors = require('cors');

io.origins('*:*');

const sequelize = require('./app/database/connection/sequelize');

app.use(cors());
app.use(express.json());

const loginRoutes = require('./app/routes/api/login');
const chatRoutes = require('./app/routes/api/chat');
const groupChatRoutes = require('./app/routes/api/groupChat');
const socketHandler = require('./app/routes/api/chatSocket');
const messageRoutes = require('./app/routes/api//message');
const userRoutes = require('./app/routes/api/user');
const postRoutes = require('./app/routes/api/post');
const likeRoutes = require('./app/routes/api/like');
const commentRoutes = require('./app/routes/api/comment');
const friendRoutes = require('./app/routes/api/friend');
const groupRoutes = require('./app/routes/api/group');

app.use('/api/authservice', loginRoutes);
app.use(auth);
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: 'invalid token' });
    }
});

app.use('/api/chatservice', chatRoutes);
app.use('/api/chatservice', groupChatRoutes);
app.use('/api/chatservice', messageRoutes);
app.use('/api/userservice', userRoutes);
app.use('/api/userservice', postRoutes);
app.use('/api/userservice', likeRoutes);
app.use('/api/userservice', commentRoutes);
app.use('/api/userservice', friendRoutes);
app.use('/api/userservice', groupRoutes);

if (process.env.NODE_ENV != 'test') {
    io.of('/api/chatservice').on('connection', socketHandler);
    sequelize.sync().then(() => {
        server.listen(config.port, () => {
            console.log('server started');
        });
    }).catch(err => console.log(err));
}
module.exports = app;
