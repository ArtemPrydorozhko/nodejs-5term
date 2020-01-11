const sequelize = require('../connection/sequelize');
const Sequelize = require('sequelize');

const Message = require('./message');

const Chat = sequelize.define("chat", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    user1Id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    user2Id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Chat.hasMany(Message, { onDelete: "cascade" });

module.exports = Chat;