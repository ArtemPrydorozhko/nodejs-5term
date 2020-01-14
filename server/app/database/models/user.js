const sequelize = require('../connection/sequelize');
const Sequelize = require('sequelize');

const Post = require('./post');
const Comment = require('./comment');
const Like = require('./like');
const Friend = require('./friend');
const Message = require('./message');

const User = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    firstname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastSeen: {
        type: Sequelize.DATE,
        allowNull: true
    },
    userRole: {
        type: Sequelize.STRING,
        allowNull: false
    },
    avatarUrl: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

User.hasMany(Post, { onDelete: "cascade", foreignKey: { allowNull: true } });
User.hasMany(Comment, { onDelete: "cascade" });
User.hasMany(Like, { onDelete: "cascade" });
User.hasMany(Friend, { onDelete: "cascade" });
User.hasMany(Message, { onDelete: "cascade" });

module.exports = User;