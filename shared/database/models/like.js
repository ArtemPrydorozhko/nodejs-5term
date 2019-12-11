const sequelize = require('../connection/sequelize');
const Sequelize = require('sequelize');

const Like = sequelize.define("like", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    type: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Like;