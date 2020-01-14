const express = require('express');
const router = express.Router();

const GroupChat = require('../../database/dao/groupChat');
const { wrapAsync } = require('../../utils/asyncWrapper');

router.get('/groupChat/all', wrapAsync(async (req, res) => {
    const chats = await GroupChat.getGroupChats();

    res.status(200).json(chats);
}));

router.get('/groupChat', wrapAsync(async (req, res) => {
    const chats = await GroupChat.getGroupChatsByUserId(req.user.id);

    res.status(200).json(chats);
}));

router.get('/groupChat/:id', wrapAsync(async (req, res) => {
    const id = req.params.id;
    const chat = await GroupChat.getGroupChatById(id);

    res.status(200).json(chat);
}));

router.delete('/groupChat/:id', wrapAsync(async (req, res) => {
    const id = req.params.id;
    const chat = await GroupChat.deleteGroupChat(id);

    res.status(200).json(chat);
}));

router.post('/groupChat', wrapAsync(async (req, res) => {
    const chat = await GroupChat.createGroupChat(req.user.id, req.body.name);

    res.status(200).json(chat);
}));

router.put('/groupChat/:id/addUser/:userId', wrapAsync(async (req, res) => {
    const chat = await GroupChat.addUserToGroupChat(req.params.id, req.params.userId);

    res.status(200).json(chat);
}));

router.put('/groupChat/:id', wrapAsync(async (req, res) => {
    const chat = await GroupChat.updateGroupChat(req.user.id, req.body);

    res.status(200).json(chat);
}));

module.exports = router;