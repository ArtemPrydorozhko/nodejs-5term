const Post = require('../models/post');
const Like = require('../models/like');
const Comment = require('../models/comment');

async function createPost(post, userId) {
    const result = await Post.create({
        text: post.text,
        mediaUrl: post.mediaUrl,
        userId
    });

    return result.dataValues;
}

async function getPostById(id) {
    const result = await Post.findByPk(id,{
        include: [{
            model: Like
        },
        {
            model: Comment
        }]
    });

    return result.dataValues;
}

async function getPostsByUserId(id) {
    const result = await Post.findAll({
        where: {
            userId: id
        },
        include: [{
            model: Like
        },
        {
            model: Comment
        }]
    });

    return result.dataValues;
}

async function getPosts() {
    return await Post.findAll({
        include: [{
            model: Like
        },
        {
            model: Comment
        }]
    });
}

async function deletePost(id) {
    const result = await Post.destroy({
        where: {
            id
        }
    });

    return result;
}

async function updatePost(post, id) {
    await Post.update(
        post,
        {
            where: {
                id
            }
        });

    const result = Post.findByPk(id,{
        include: [{
            model: Like
        },
        {
            model: Comment
        }]
    });

    return result.dataValues;
}

module.exports = {
    createPost,
    getPostById,
    getPostsByUserId,
    getPosts,
    deletePost,
    updatePost
}
