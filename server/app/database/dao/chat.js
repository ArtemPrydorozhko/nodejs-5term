const Chat = require('../models/chat');
const Message = require('../models/message');
const User = require('../models/user');

const Op = require('sequelize').Op;   

async function createChat(user1Id, user2Id) {
    const result = await Chat.create({
        user1Id,
        user2Id
    });

    return result.dataValues;
}

async function doesChatExist(user1Id, user2Id) {
    const result = await Chat.findOne({
        where: {
            user1Id : {
                [Op.or]: [user1Id, user2Id],
            },
            user2Id:{
                [Op.or]: [user1Id, user2Id]
            }
        },
        raw: true
    });

    return result;
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
        raw: true
    });

    for (let index = 0; index < result.length; index++) {
        const chat = result[index];
        let user;
        if (chat.user1Id === id) {
            user = await User.findByPk(chat.user2Id, { raw: true });
            result[index].firstname = user.firstname;
            result[index].lastname = user.lastname;
        } else {
            user = await User.findByPk(chat.user1Id, { raw: true });
            result[index].firstname = user.firstname;
            result[index].lastname = user.lastname;
        }
    }

    return result;
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
    doesChatExist,
    getChatById,
    getChatsByUserId,
    getChats,
    deleteChat
}
