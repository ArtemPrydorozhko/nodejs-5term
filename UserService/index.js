const express = require('express');
const config = require('./config/config');
const app = express();
const auth = require('./app/routes/middleware/auth');

const sequelize = require('./app/database/connection/sequelize');

app.use(express.json());

const userRoutes = require('./app/routes/api/user');
const postRoutes = require('./app/routes/api/post');
app.use(auth);
app.use(function (err, req, res, next) {
    console.log(req.user);

    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: 'invalid token' });
    }
});

app.use('/api/userservice', userRoutes);
app.use('/api/userservice', postRoutes);

sequelize.sync().then(() => {
    app.listen(config.userPort, () => {
        console.log('UserService started');
    });
}).catch(err => console.log(err));
