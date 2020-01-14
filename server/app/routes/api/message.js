const express = require('express');
const router = express.Router();

const Message = require('../../database/dao/message');
const User = require('../../database/dao/user');
const io = require('../../../socket').io;
const { wrapAsync } = require('../../utils/asyncWrapper');

router.get('/message/all', wrapAsync(async (req, res) => {
    const messages = await Message.getMessages();

    res.status(200).json(messages);
}));

router.get('/message', wrapAsync(async (req, res) => {
    const messages = await Message.getMessagesByUserId(req.user.id);

    res.status(200).json(messages);
}));

router.get('/message/chat/:id', wrapAsync(async (req, res) => {
    const messages = await Message.getMessagesByChatId(req.params.id);

    res.status(200).json(messages);
}));

router.get('/message/:id', wrapAsync(async (req, res) => {
    const id = req.params.id;
    const message = await Message.getMessageById(id);

    res.status(200).json(message);
}));

router.delete('/message/:id', wrapAsync(async (req, res) => {
    const id = req.params.id;
    const message = await Message.deleteMessage(id);

    res.status(200).json(message);
}));

router.put('/message/:id', wrapAsync(async (req, res) => {
    const id = req.params.id;
    const message = await Message.updateMessage(req.body, id);
    io.to(req.body.chatId.toString()).emit('update message', {
        text: message.text,
        id: message.id
    });

    res.status(200).json(message);
}));

router.post('/message', wrapAsync(async (req, res) => {
    const message = await Message.createMessage(req.user.id, req.body.chatId, req.body.text, req.body.mediaUrl, req.body.time);
    const user = await User.getUserById(req.user.id);

    io.of('/api/chatservice').to(req.body.chatId.toString()).emit('chatMessage', {
        ...message,
        firstname: user.firstname,
        lastname: user.lastname,
    });
    res.status(200).json(message);
}));

module.exports = router;