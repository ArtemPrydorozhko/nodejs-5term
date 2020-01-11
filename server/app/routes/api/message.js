const express = require('express');
const router = express.Router();

const Message = require('../../database/dao/message');
const User = require('../../database/dao/user');
const io = require('../../../socket').io;

router.get('/message/all', async (req, res) => {
    try {
        const messages = await Message.getMessages();

        res.status(200).json(messages);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.get('/message', async (req, res) => {
    try {
        const messages = await Message.getMessagesByUserId(req.user.id);

        res.status(200).json(messages);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.get('/message/chat/:id', async (req, res) => {
    try {
        const messages = await Message.getMessagesByChatId(req.params.id);
        console.log(messages);
        
        res.status(200).json(messages);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.get('/message/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const message = await Message.getMessageById(id);

        res.status(200).json(message);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.delete('/message/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const message = await Message.deleteMessage(id);

        res.status(200).json(message);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.put('/message/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const message = await Message.updateMessage(req.body, id);
        io.to(req.body.chatId.toString()).emit('update message', {
            text: message.text,
            id: message.id
        });

        res.status(200).json(message);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.post('/message', async (req, res) => {
    try {
        console.log(req.body);
        const message = await Message.createMessage(req.user.id, req.body.chatId, req.body.text, req.body.mediaUrl, req.body.time);
        const user = await User.getUserById(req.user.id);
        console.log(message);
        
        io.of('/api/chatservice').to(req.body.chatId.toString()).emit('chatMessage', {
            ...message,
            firstname: user.firstname,
            lastname: user.lastname,
        });
        res.status(200).json(message);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;