const express = require('express');
const config = require('./app/config/config');
const app = express();

require('./app/database/connection/sequelize');
require('./app/database/connection/sync');

app.use(express.json());

const loginRoutes = require('./app/routes/api/login');
app.use('/api/authservice', loginRoutes);

app.listen(config.authPort, () => {
    console.log('AuthService started');
});