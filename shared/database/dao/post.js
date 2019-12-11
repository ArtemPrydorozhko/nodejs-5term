const Post = require('../models/post');

async function createPost(post, userId) {
    const result = await Post.create({
        text: post.text,
        mediaUrl: post.mediaUrl,
        userId
    });

    return result.dataValues;
}

async function getPostById(id) {
    const result = await Post.findByPk(id);

    return result.dataValues;
}

async function getPostsByUserId(id) {
    const result = await Post.findAll({
        where: {
            userId: id
        }
    });

    return result.dataValues;
}

async function getPosts() {
    return await Post.findAll();
}

async function deletePost(post) {
    const result = await Post.destroy({
        where: {
            id: post.id
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

    const result = Post.findByPk(id);

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
