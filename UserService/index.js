const express = require('express');
const config = require('./app/config/config');
const app = express();
const auth = require('./app/routes/middleware/auth');

require('./app/database/connection/sequelize');
require('./app/database/connection/sync');


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

app.listen(config.userPort, () => {
    console.log('UserService started');
});