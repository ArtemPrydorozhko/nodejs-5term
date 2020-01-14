const GroupMessage = require('../models/groupMessage');

async function createGroupMessage(userId, text, mediaUrl) {
    const result = await GroupMessage.create({
        userId,
        text,
        mediaUrl
    });

    return result.dataValues;
}

async function getGroupMessageById(id) {
    const result = await GroupMessage.findByPk(id);

    return result.dataValues;
}

async function getGroupMessagesByChatId(chatId) {
    const result = await GroupMessage.findOne({
        where: {
            chatId
        }
    });

    return result.dataValues;
}

async function getGroupMessages() {
    return await GroupMessage.findAll();
}

async function deleteGroupMessage(id) {
    const result = await GroupMessage.destroy({
        where: {
            id
        }
    });

    return result;
}

async function updateGroupMessage(message, id) {
    await GroupMessage.update(
        message,
        {
            where: {
                id
            }
        });

    const result = GroupMessage.findByPk(id);

    return result.dataValues;
}

module.exports = {
    createGroupMessage,
    getGroupMessageById,
    getGroupMessagesByChatId,
    getGroupMessages,
    deleteGroupMessage,
    updateGroupMessage
}
