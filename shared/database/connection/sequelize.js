const Sequelize = require("sequelize");
const config = require('../../config/config');
let sequelize = new Sequelize(config.dbDatabase, config.dbUser, config.dbPassword, {
    dialect: "mysql",
    host: config.dbHost
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
});

module.exports = sequelize;
