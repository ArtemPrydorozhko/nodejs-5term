const express = require('express');
const router = express.Router();

const Friend = require('../../database/dao/friend');

router.get('/friend/all', async (req, res) => {
    try {
        const friends = await Friend.getFriends();

        res.status(200).json(friends);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.get('/friend', async (req, res) => {
    try {
        const friends = await Friend.getFriendsByUserId(req.user.id);
        console.log(friends);
        

        res.status(200).json(friends);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }

});
router.get('/friend/exist/:id', async (req, res) => {
    try {
        const friends = await Friend.areUsersFriends(req.params.id, req.user.id);
        console.log(friends);

        res.status(200).json(friends);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.get('/friend/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const friend = await Friend.areUsersFriends(id, req.user.id);
        console.log(friend);
        
        res.status(200).json(friend);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.delete('/friend/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Friend.deleteFriend(id, req.user.id);

        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.post('/friend', async (req, res) => {
    try {
        const result = await Friend.createFriend(req.body.friendId, req.user.id);
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;