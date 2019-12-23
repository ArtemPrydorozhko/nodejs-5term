const GroupUser = require('../models/groupUser');
const User = require('../models/user');
const Group = require('../models/group');

async function createGroup(userId, name) {
    const result = await Group.create({
        name
    });
    const user = await User.findByPk(userId);
    const rawUser = user.dataValues;
    await result.addUser(rawUser.id, { through: { admin: true } });

    return result.dataValues;
}

async function getGroupById(id) {
    const group = await Group.findByPk(id);

    const users = await group.getUsers({raw: true});
    const result = group.dataValues;
    result.users = users;

    return result;
}

async function getGroupsByUserId(id) {
    const user = await User.findByPk(id);

    const result = await user.getGroups({raw: true});
    
    return result;
}

async function getGroups() {
    return await Group.findAll({
        raw: true
    });
}

async function deleteGroup(id) {
    const result = await Group.destroy({
        where: {
            id
        }
    });

    return result;
}

async function updateGroup(id, group) {
    await Group.update(
        group,
        {
            where: {
                id
            }
        });

    const result = Group.findByPk(id);

    return result.dataValues;
}

async function addUserToGroup(groupId, userId) {
    const grop = await Group.findByPk(groupId);
    const user = await User.findByPk(userId);
    await grop.addUser(user.dataValues.id, { through: { admin: false } });

    return true;
}

async function removeUserFromGroup(groupId, userId) {
    const result = await GroupUser.destroy({
        where: {
            userId,
            groupId
        }
    })

    return result;
}

module.exports = {
    createGroup,
    getGroupById,
    getGroupsByUserId,
    getGroups,
    deleteGroup,
    updateGroup,
    removeUserFromGroup,
    addUserToGroup
}
