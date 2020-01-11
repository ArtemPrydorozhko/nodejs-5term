const GroupChat = require('../models/groupChat');
const User = require('../dao/user');
const GroupMessage = require('../models/groupMessage')

async function createGroupChat(userId, name) {
    const result = await GroupChat.create({
        name
    });
    const user = await User.getUserById(userId);
    result.addUser(user, { through: { admin: true } });

    return result.dataValues;
}

async function getGroupChatById(id) {
    const result = await GroupChat.findByPk(id,{
        include: [GroupMessage]
    });

    return result.dataValues;
}

async function getGroupChatsByUserId(id) {
    const result = await GroupChat.findAll({
        where: {
            [Op.or]: [{ user1Id: id }, { user2Id: id }]
        },
        include: [GroupMessage]
    });

    return result.dataValues;
}

async function getGroupChats() {
    return await GroupChat.findAll({
        include: [GroupMessage]
    });
}

async function deleteGroupChat(id) {
    const result = await GroupChat.destroy({
        where: {
            id
        }
    });

    return result;
}

async function updateGroupChat(id, groupChat) {
    await GroupChat.update(
        groupChat,
        {
            where: {
                id
            }
        });

    const result = GroupChat.findByPk(id,{
        include: [GroupMessage]
    });

    return result.dataValues;
}

async function addUserToGroupChat(groupChatId, userId) {
    const groupChat = await GroupChat.findByPk(groupChatId);
    const user = await User.getUserById(userId);
    groupChat.addUser(user, { through: { admin: false } });

    return true;
}

module.exports = {
    createGroupChat,
    getGroupChatById,
    getGroupChatsByUserId,
    getGroupChats,
    deleteGroupChat,
    updateGroupChat,
    addUserToGroupChat
}
