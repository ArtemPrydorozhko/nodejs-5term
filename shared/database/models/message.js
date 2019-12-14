const sequelize = require('../connection/sequelize');
const Sequelize = require('sequelize');

const Message = sequelize.define("message", {
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
    },
    edited: {
        type: Sequelize.STRING,
        allowNull: true
    },
    time: {
      type: Sequelize.STRING,
      allowNull: false
    }
});

module.exports = Message;