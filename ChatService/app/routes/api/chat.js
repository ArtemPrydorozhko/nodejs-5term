const express = require('express');
const router = express.Router();
const redisClient = require('../../database/connection/redis');
const chatPub = redis.duplicate();
const Chat = require('../../database/dao/chat');

router.get('/chat/all', async (req, res) => {
    try {
        const chats = await Chat.getChats();

        res.status(200).json(chats);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.get('/chat', async (req, res) => {
    try {
        const chats = await Chat.getChatsByUserId(req.user.id);

        res.status(200).json(chats);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.get('/chat/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const chat = await Chat.getChatById(id);

        res.status(200).json(chat);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.delete('/chat/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const chat = await Chat.deleteChat(id);
        chatPub.publish('leave chat', JSON.stringify(Object.assign({}, {
            user1Id: req.user.id.toString(),
            user2Id: req.body.user2Id.toString(),
            chatId:  chat.id.toString()
        })));

        res.status(200).json(chat);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.post('/chat', async (req, res) => {
    try {
        const chat = await Chat.createChat(req.user.id, req.body.user2Id);
        redisClient.sadd('chat:' + req.user.id.toString(), chat.id.toString());
        redisClient.sadd('chat:' + req.body.user2Id.toString(), chat.id.toString());
        chatPub.publish('new chat', JSON.stringify(Object.assign({}, {
            user1Id: req.user.id.toString(),
            user2Id: req.body.user2Id.toString(),
            chatId:  chat.id.toString()
        })));
        res.status(200).json(chat);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;