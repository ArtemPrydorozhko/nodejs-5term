const express = require('express');
const router = express.Router();

const Comment = require('../../database/dao/comment');
const User = require('../../database/dao/user');
const { wrapAsync } = require('../../utils/asyncWrapper');

router.get('/comment/all', wrapAsync(async (req, res) => {
    const posts = await Comment.getComments();

    res.status(200).json(posts);
}));

router.get('/comment', wrapAsync(async (req, res) => {
    const posts = await Comment.getCommentsByUserId(req.user.id);

    res.status(200).json(posts);
}));

router.get('/comment/:id', wrapAsync(async (req, res) => {
    const id = req.params.id;
    const post = await Comment.getCommentById(id);

    res.status(200).json(post);
}));

router.put('/comment/:id', wrapAsync(async (req, res) => {
    const id = req.params.id;
    const post = await Comment.updateComment(req.body, id);

    res.status(200).json(post);
}));

router.delete('/comment/:id', wrapAsync(async (req, res) => {
    const id = req.params.id;
    const post = await Comment.deleteComment(id);

    res.status(200).json(post);
}));

router.post('/comment', wrapAsync(async (req, res) => {
    const user = await User.getUserById(req.user.id);
    const comment = { ...req.body };
    comment.firstname = user.firstname;
    comment.lastname = user.lastname;

    const result = await Comment.createComment(comment, req.user.id);
    res.status(200).json(result);
}));

module.exports = router;