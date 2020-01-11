const sequelize = require('../connection/sequelize');
const Sequelize = require('sequelize');

const Message = sequelize.define("message", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    text: {
        type: Sequelize.STRING,
        allowNull: true
    },
    mediaUrl: {
        type: Sequelize.STRING,
        allowNull: true
    },
    edited: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
    time: {
      type: Sequelize.STRING,
      allowNull: false
    },
    chatId: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
});

module.exports = Message;