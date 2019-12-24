const sequelize = require('../connection/sequelize');
const Sequelize = require('sequelize');

const User = require('./user');
const GroupChat = require('./groupChat');

const GroupChatUser = sequelize.define("groupchat", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

User.belongsToMany(GroupChat, {through: GroupChatUser});
GroupChat.belongsToMany(User, {through: GroupChatUser});

module.exports = GroupChatUser;