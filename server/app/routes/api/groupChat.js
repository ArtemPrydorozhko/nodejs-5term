const express = require('express');
const router = express.Router();

const GroupChat = require('../../database/dao/groupChat');

router.get('/groupChat/all', async (req, res) => {
    try {
        const chats = await GroupChat.getGroupChats();

        res.status(200).json(chats);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.get('/groupChat', async (req, res) => {
    try {
        const chats = await GroupChat.getGroupChatsByUserId(req.user.id);

        res.status(200).json(chats);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.get('/groupChat/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const chat = await GroupChat.getGroupChatById(id);

        res.status(200).json(chat);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.delete('/groupChat/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const chat = await GroupChat.deleteGroupChat(id);

        res.status(200).json(chat);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.post('/groupChat', async (req, res) => {
    try {
        const chat = await GroupChat.createGroupChat(req.user.id, req.body.name);

        res.status(200).json(chat);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.put('/groupChat/:id/addUser/:userId', async (req, res) => {
    try {
        const chat = await GroupChat.addUserToGroupChat(req.params.id, req.params.userId);

        res.status(200).json(chat);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.put('/groupChat/:id', async (req, res) => {
    try {
        const chat = await GroupChat.updateGroupChat(req.user.id, req.body);

        res.status(200).json(chat);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;