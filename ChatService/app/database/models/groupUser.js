const sequelize = require('../connection/sequelize');
const Sequelize = require('sequelize');

const User = require('./user');
const Group = require('./group');

const GroupUser = sequelize.define("groupuser", {
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

User.belongsToMany(Group, {through: GroupUser});
Group.belongsToMany(User, {through: GroupUser});

module.exports = GroupUser;