const sequelize = require('../connection/sequelize');
const Sequelize = require('sequelize');

const GroupMessage = require('./groupMessage');

const GroupChat = sequelize.define("groupchat", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

GroupChat.hasMany(GroupMessage, { onDelete: "cascade" });

module.exports = GroupChat;