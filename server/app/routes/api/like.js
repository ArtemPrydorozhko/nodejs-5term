const express = require('express');
const router = express.Router();

const Like = require('../../database/dao/like');
const { wrapAsync } = require('../../utils/asyncWrapper');

router.get('/like/all', wrapAsync(async (req, res) => {
    const likes = await Like.getLikes();

    res.status(200).json(likes);
}));

router.get('/like', wrapAsync(async (req, res) => {
    const likes = await Like.getLikesByUserId(req.user.id);

    res.status(200).json(likes);
}));

router.get('/like/:id', wrapAsync(async (req, res) => {
    const id = req.params.id;
    const like = await Like.getLikeById(id);

    res.status(200).json(like);
}));

router.put('/like/:id', wrapAsync(async (req, res) => {
    const id = req.params.id;
    const like = await Like.updateLike(req.body, id);

    res.status(200).json(like);
}));

router.delete('/like/:id', wrapAsync(async (req, res) => {
    const id = req.params.id;
    const like = await Like.deleteLike(id);

    res.status(200).json(like);
}));

router.post('/like', wrapAsync(async (req, res) => {
    const like = await Like.createLike(req.body.type, req.user.id, req.body.postId);

    res.status(200).json(like);
}));

module.exports = router;