const express = require('express');
const router = express.Router();

const Comment = require('../../database/dao/comment');
const User = require('../../database/dao/user');

router.get('/comment/all', async (req, res) => {
    try {
        const posts = await Comment.getComments();

        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.get('/comment', async (req, res) => {
    try {
        const posts = await Comment.getCommentsByUserId(req.user.id);

        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.get('/comment/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Comment.getCommentById(id);

        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.put('/comment/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Comment.updateComment(req.body, id);

        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.delete('/comment/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Comment.deleteComment(id);

        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.post('/comment', async (req, res) => {
    try {
        const user = await User.getUserById(req.user.id);
        const comment = { ...req.body };
        comment.firstname = user.firstname;
        comment.lastname = user.lastname;
        
        
        const result = await Comment.createComment(comment, req.user.id);
        console.log(result);
        // result.firstname = user.firstname;
        // result.lastname = user.lastname;
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;