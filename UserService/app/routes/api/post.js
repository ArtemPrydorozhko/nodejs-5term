const express = require('express');
const router = express.Router();

const Post = require('../../database/dao/post');

router.get('/post/all', async (req, res) => {
    try {
        const posts = await Post.getPosts();

        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.get('/post/user/:userId', async (req, res) => {
    try {
        console.log(req.params.userId, req.user.id);
        
        const posts = await Post.getPostsByUserId(req.params.userId, req.user.id);
        console.log(posts);
        
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.getPostById(id);

        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.put('/post/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.updatePost(req.body, id);

        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.delete('/post/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.deletePost(id);

        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.post('/post', async (req, res) => {
    try {
        console.log(req.user);
        
        const post = await Post.createPost(req.body, req.user.id);

        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;