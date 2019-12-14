const Chat = require('../models/chat');
const Message = require('../models/message');

async function createChat(user1Id, user2Id) {
    const result = await Chat.create({
        user1Id,
        user2Id
    });

    return result.dataValues;
}

async function getChatById(id) {
    const result = await Chat.findByPk(id,{
        include: [Message]
    });

    return result.dataValues;
}

async function getChatsByUserId(id) {
    const result = await Chat.findAll({
        where: {
            [Op.or]: [{ user1Id: id }, { user2Id: id }]
        },
        include: [Message]
    });

    return result.dataValues;
}

async function getChats() {
    return await Chat.findAll({
        include: [Message]
    });
}

async function deleteChat(id) {
    const result = await getChatById(id);
    await Chat.destroy({
        where: {
            id
        }
    });

    return result;
}

module.exports = {
    createChat,
    getChatById,
    getChatsByUserId,
    getChats,
    deleteChat
}
