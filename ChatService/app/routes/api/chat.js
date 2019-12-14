const express = require('express');
const router = express.Router();

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

        res.status(200).json(chat);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.post('/chat', async (req, res) => {
    try {
        const chat = await Chat.createChat(req.user.id, req.body.user2Id);

        res.status(200).json(chat);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;