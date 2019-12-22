const sequelize = require('../connection/sequelize');
const Sequelize = require('sequelize');

const Post = require('./post');

const Group = sequelize.define("group", {
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

Group.hasMany(Post, { onDelete: "cascade", foreignKey: { allowNull: true } });

module.exports = Group;