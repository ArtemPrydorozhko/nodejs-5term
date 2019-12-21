const express = require('express');
const config = require('./config/config');
const app = express();
const auth = require('./app/routes/middleware/auth');
const cors = require('cors');

const sequelize = require('./app/database/connection/sequelize');

app.use(cors());
app.use(express.json());

const userRoutes = require('./app/routes/api/user');
const postRoutes = require('./app/routes/api/post');
const likeRoutes = require('./app/routes/api/like');
const commentRoutes = require('./app/routes/api/comment');
const friendRoutes = require('./app/routes/api/friend');
app.use(auth);
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: 'invalid token' });
    }
});

app.use('/api/userservice', userRoutes);
app.use('/api/userservice', postRoutes);
app.use('/api/userservice', likeRoutes);
app.use('/api/userservice', commentRoutes);
app.use('/api/userservice', friendRoutes);

sequelize.sync().then(() => {
    app.listen(config.userPort, () => {
        console.log('UserService started');
    });
}).catch(err => console.log(err));
