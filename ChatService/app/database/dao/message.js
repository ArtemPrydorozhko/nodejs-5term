const Message = require('../models/message');

async function createMessage(userId, chatId, text, mediaUrl, time) {
    const result = await Message.create({
        userId,
        text,
        time,
        mediaUrl,
        chatId,
        edited: false
    });

    return result.dataValues;
}

async function getMessageById(id) {
    const result = await Message.findByPk(id);

    return result.dataValues;
}

async function getMessagesByChatId(chatId) {
    const result = await Message.findAll({
        where: {
            chatId
        },
        raw: true
    });

    return result;
}

async function getMessages() {
    return await Message.findAll();
}

async function deleteMessage(id) {
    const result = await Message.destroy({
        where: {
            id
        }
    });

    return result;
}

async function updateMessage(message, id) {
    message.edited = true;
    await Message.update(
        message,
        {
            where: {
                id
            }
        });

    const result = Message.findByPk(id);

    return result.dataValues;
}

module.exports = {
    createMessage,
    getMessageById,
    getMessagesByChatId,
    getMessages,
    deleteMessage,
    updateMessage
}
