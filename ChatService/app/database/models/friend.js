const sequelize = require('../connection/sequelize');
const Sequelize = require('sequelize');

const Friend = sequelize.define("chat", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    frienId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Friend;