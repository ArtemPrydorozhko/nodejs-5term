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
        const messagePr = Message.createMessage(req.user.id, req.body.chatId, req.body.text, req.body.mediaUrl);
        const userPr = User.getUserById(req.user.id);
        const [message, user] = await Promise.all(messagePr, userPr);

        io.to(req.body.chatId.toString()).emit('message', {
            text: message.text,
            time: message.time,
            firstname: user.firstname,
            lastname: user.lastname,
            chatId: req.body.chatId
        });
        res.status(200).json(message);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;