const Comment = require('../models/comment');

async function createComment(comment, userId, postId) {
    const result = await Comment.create({
        text: comment.text,
        userId,
        postId
    });

    return result.dataValues;
}

async function getCommentById(id) {
    const result = await Comment.findByPk(id);

    return result.dataValues;
}

async function getCommentsByUserId(id) {
    const result = await Comment.findAll({
        where: {
            userId: id
        }
    });

    return result.dataValues;
}

async function getCommentsByPostId(id) {
    const result = await Comment.findAll({
        where: {
            postId: id
        }
    });

    return result.dataValues;
}

async function getComments() {
    return await Comment.findAll();
}

async function deleteComment(post) {
    const result = await Comment.destroy({
        where: {
            id: post.id
        }
    });

    return result;
}

async function updateComment(post, id) {
    await Comment.update(
        post,
        {
            where: {
                id
            }
        });
    
    const result = Comment.findByPk(id);

    return result.dataValues;
}

module.exports = {
    createComment,
    getCommentById,
    getCommentsByUserId,
    getCommentsByPostId,
    getComments,
    deleteComment,
    updateComment
}
