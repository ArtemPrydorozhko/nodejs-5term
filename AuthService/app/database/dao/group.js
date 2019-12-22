const GroupUser = require('../models/groupUser');
const User = require('../dao/user');
const Group = require('../models/group');

async function createGroup(userId, name) {
    const result = await Group.create({
        name
    });
    const user = await User.getUserById(userId);
    const rawUser
    result.addUser(rawUser, { through: { admin: true } });

    return result.dataValues;
}

async function getGroupById(id) {
    const group = await Group.findByPk(id);

    const result = group.getUsers();
    console.log(result);

    return result.dataValues;
}

async function getGroupsByUserId(id) {
    const user = await User.findByPk(id);

    const result = user.getGroups();
    console.log(result);
    
    return result.dataValues;

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
    const user = await User.getUserById(userId);
    grop.addUser(user, { through: { admin: false } });

    return true;
}

module.exports = {
    createGroup,
    getGroupById,
    getGroupsByUserId,
    getGroups,
    deleteGroup,
    updateGroup,
    addUserToGroup
}
