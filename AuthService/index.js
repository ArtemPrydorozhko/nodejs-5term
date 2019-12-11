const express = require('express');
const config = require('./config/config');
const app = express();

const sequelize = require('./app/database/connection/sequelize');

app.use(express.json());

const loginRoutes = require('./app/routes/api/login');
app.use('/api/authservice', loginRoutes);

sequelize.sync().then(() => {
    app.listen(config.authPort, () => {
        console.log('AuthService started');
    });
}).catch(err => console.log(err));