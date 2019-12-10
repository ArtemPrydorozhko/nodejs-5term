const sequelize = require('../connection/sequelize');
const Sequelize = require('sequelize');

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
        type: Sequelize.STRING,
        allowNull: true
    }
});

module.exports = Post;