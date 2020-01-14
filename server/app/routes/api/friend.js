const express = require('express');
const router = express.Router();

const Friend = require('../../database/dao/friend');
const { wrapAsync } = require('../../utils/asyncWrapper');

router.get('/friend/all', wrapAsync(async (req, res) => {
    const friends = await Friend.getFriends();

    res.status(200).json(friends);
}));

router.get('/friend', wrapAsync(async (req, res) => {
    const friends = await Friend.getFriendsByUserId(req.user.id);

    res.status(200).json(friends);
}));
router.get('/friend/exist/:id', wrapAsync(async (req, res) => {
    const friends = await Friend.areUsersFriends(req.params.id, req.user.id);

    res.status(200).json(friends);
}));

router.get('/friend/:id', wrapAsync(async (req, res) => {
    const id = req.params.id;
    const friend = await Friend.areUsersFriends(id, req.user.id);

    res.status(200).json(friend);
}));

router.delete('/friend/:id', wrapAsync(async (req, res) => {
    const id = req.params.id;
    const post = await Friend.deleteFriend(id, req.user.id);

    res.status(200).json(post);
}));

router.post('/friend', wrapAsync(async (req, res) => {
    const result = await Friend.createFriend(req.body.friendId, req.user.id);

    res.status(200).json(result);
}));

module.exports = router;