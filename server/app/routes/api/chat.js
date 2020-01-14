const express = require('express');
const router = express.Router();
const redisClient = require('../../database/connection/redis');
const chatPub = redisClient.duplicate();
const Chat = require('../../database/dao/chat');
const { wrapAsync } = require('../../utils/asyncWrapper');

router.get('/chat/all', wrapAsync(async (req, res) => {
    const chats = await Chat.getChats();

    res.status(200).json(chats);
}));

router.get('/chat', wrapAsync(async (req, res) => {
    const chats = await Chat.getChatsByUserId(req.user.id);

    res.status(200).json(chats);
}));

router.get('/chat/:id', wrapAsync(async (req, res) => {
    const id = req.params.id;
    const chat = await Chat.getChatById(id);

    res.status(200).json(chat);
}));

router.delete('/chat/:id', wrapAsync(async (req, res) => {
    const id = req.params.id;
    const chat = await Chat.deleteChat(id);
    chatPub.publish('leave chat', JSON.stringify(Object.assign({}, {
        user1Id: req.user.id.toString(),
        user2Id: req.body.user2Id.toString(),
        chatId: chat.id.toString()
    })));

    res.status(200).json(chat);
}));

router.post('/chat', wrapAsync(async (req, res) => {
    const doesExist = await Chat.doesChatExist(req.user.id, req.body.userId);

    if (doesExist) {
        res.status(200).json(doesExist);
        return
    }

    const chat = await Chat.createChat(req.user.id, req.body.userId);
    redisClient.sadd('chat:' + req.user.id.toString(), chat.id.toString());
    redisClient.sadd('chat:' + req.body.user2Id.toString(), chat.id.toString());
    chatPub.publish('new chat', JSON.stringify(Object.assign({}, {
        user1Id: req.user.id.toString(),
        user2Id: req.body.user2Id.toString(),
        chatId: chat.id.toString()
    })));

    res.status(200).json(chat);
}));

module.exports = router;