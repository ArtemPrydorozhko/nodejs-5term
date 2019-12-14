const sequelize = require('../connection/sequelize');
const Sequelize = require('sequelize');

const GroupMessage = sequelize.define("groupMessage", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    text: {
        type: Sequelize.STRING,
        allowNull: true
    },
    mediaUrl: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

module.exports = GroupMessage;