const Sequelize = require('../connection/sequelize');
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
    const result = await Post.findByPk(id, {
        include: [{
            model: Like
        },
        {
            model: Comment
        }]
    });

    return result.dataValues;
}

async function getPostsByUserId(userId, id) {
    const result = await Post.findAll({
        where: {
            userId
        },
        raw: true
    });

    for (let index = 0; index < result.length; index++) {
        const likes = await Like.findAll({
            where: {
                postId: result[index].id,
                type: 'like'
            },
            raw: true
        });
        
        const dislikes = await Like.findAll({
            where: {
                postId: result[index].id,
                type: 'dislike'
            },
            raw: true
        });
        const comments = await Comment.findAll({
            where: {
                postId: result[index].id
            },
            raw: true
        });

        const userLike = await Like.findOne({
            where: {
                postId: result[index].id,
                userId: id
            },
            raw: true
        })
        
        result[index].likes = likes.length;
        result[index].dislikes = dislikes.length;
        result[index].comments = comments;
        result[index].userLikeId = userLike ? userLike.id : null;
        result[index].userLike = userLike ? userLike.type : null;
    }

    return result;
}

async function getPostsByGroupId(groupId, id) {
    const result = await Post.findAll({
        where: {
            groupId
        },
        raw: true
    });

    for (let index = 0; index < result.length; index++) {
        const likes = await Like.findAll({
            where: {
                postId: result[index].id,
                type: 'like'
            },
            raw: true
        });
        
        const dislikes = await Like.findAll({
            where: {
                postId: result[index].id,
                type: 'dislike'
            },
            raw: true
        });
        const comments = await Comment.findAll({
            where: {
                postId: result[index].id
            },
            raw: true
        });

        const userLike = await Like.findOne({
            where: {
                postId: result[index].id,
                userId: id
            },
            raw: true
        })
        
        result[index].likes = likes.length;
        result[index].dislikes = dislikes.length;
        result[index].comments = comments;
        result[index].userLikeId = userLike ? userLike.id : null;
        result[index].userLike = userLike ? userLike.type : null;
    }

    return result;
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

    const result = Post.findByPk(id, {
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
    getPostsByGroupId,
    getPosts,
    deletePost,
    updatePost
}
