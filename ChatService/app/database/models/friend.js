const sequelize = require('../connection/sequelize');
const Sequelize = require('sequelize');

const Friend = sequelize.define("friend", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    friendId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Friend;