const express = require('express');
const config = require('./config/config');
const app = express();

const sequelize = require('./app/database/connection/sequelize');
require('./app/database/models/user');
sequelize.sync().catch(err => console.log(err));

app.use(express.json());

const loginRoutes = require('./app/routes/api/login');
app.use('/api/auth', loginRoutes);

app.listen(config.authPort, () => {
    console.log('AuthService started');
});