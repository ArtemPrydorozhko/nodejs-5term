const express = require('express');
const router = express.Router();

const Post = require('../../database/dao/post');
const { wrapAsync } = require('../../utils/asyncWrapper');

router.get('/post/all', wrapAsync(async (req, res) => {
    const posts = await Post.getPosts();

    res.status(200).json(posts);
}));

router.get('/post/user/:userId', wrapAsync(async (req, res) => {
    const posts = await Post.getPostsByUserId(req.params.userId, req.user.id);

    res.status(200).json(posts);
}));

router.get('/post/group/:groupId', wrapAsync(async (req, res) => {
    const posts = await Post.getPostsByGroupId(req.params.groupId, req.user.id);

    res.status(200).json(posts);
}));

router.get('/post/:id', wrapAsync(async (req, res) => {
    const id = req.params.id;
    const post = await Post.getPostById(id);

    res.status(200).json(post);

}));

router.put('/post/:id', wrapAsync(async (req, res) => {
    const id = req.params.id;
    const post = await Post.updatePost(req.body, id);

    res.status(200).json(post);
}));

router.delete('/post/:id', wrapAsync(async (req, res) => {
    const id = req.params.id;
    const post = await Post.deletePost(id);

    res.status(200).json(post);
}));

router.post('/post', wrapAsync(async (req, res) => {
    const post = await Post.createPost(req.body, req.user.id);

    res.status(200).json(post);
}));

router.post('/post/group/:groupId', wrapAsync(async (req, res) => {
    const post = await Post.createGroupPost(req.body, req.params.groupId);

    res.status(200).json(post);
}));

module.exports = router;