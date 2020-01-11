const sequelize = require('../connection/sequelize');
const Sequelize = require('sequelize');

const Comment = require('./comment');
const Like = require('./like');

const Post = sequelize.define("post", {
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
        type: Sequelize.TEXT,
        allowNull: true
    },
    groupId: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
});

Post.hasMany(Comment, { onDelete: "cascade" });
Post.hasMany(Like, { onDelete: "cascade" });

module.exports = Post;