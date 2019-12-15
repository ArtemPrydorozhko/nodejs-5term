const express = require('express');
const router = express.Router();

const Like = require('../../database/dao/like');

router.get('/like/all', async (req, res) => {
    try {
        const likes = await Like.getLikes();

        res.status(200).json(likes);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.get('/like', async (req, res) => {
    try {
        const likes = await Like.getLikesByUserId(req.user.id);

        res.status(200).json(likes);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.get('/like/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const like = await Like.getLikeById(id);

        res.status(200).json(like);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.put('/like/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const like = await Like.updateLike(req.body, id);

        res.status(200).json(like);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.delete('/like/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const like = await Like.deleteLike(id);

        res.status(200).json(like);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.post('/like', async (req, res) => {
    try {
        const like = await Like.createLike(req.body.type, req.user.id, req.body.postId);

        res.status(200).json(like);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;