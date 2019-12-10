const sequelize = require('../connection/sequelize');
const Sequelize = require('sequelize');

const Post = require('./post');

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
    }
});

User.hasMany(Post, { onDelete: "cascade" });

module.exports = User;