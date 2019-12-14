const sequelize = require('../connection/sequelize');
const Sequelize = require('sequelize');

const Comment = sequelize.define("comment", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    text: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

module.exports = Comment;