const Like = require('../models/like');

async function createLike(type, userId, postId) {
    const result = await Like.create({
        type,
        userId,
        postId
    });

    return result.dataValues;
}

async function getLikeById(id) {
    const result = await Like.findByPk(id);

    return result.dataValues;
}

async function getLikeByUserPostId(userId, postId) {
    const result = await Like.findOne({
        where: {
            userId,
            postId
        }
    });

    return result.dataValues;
}

async function getLikesByUserId(id) {
    const result = await Like.findAll({
        where: {
            userId: id
        }
    });

    return result.dataValues;
}

async function getLikesByPostId(id) {
    const result = await Like.findAll({
        where: {
            postId: id
        }
    });

    return result.dataValues;
}

async function getLikes() {
    return await Like.findAll();
}

async function deleteLike(like) {
    const result = await Like.destroy({
        where: {
            id: like.id
        }
    });

    return result;
}

async function updateLike(like, id) {
    await Like.update(
        like,
        {
            where: {
                id
            }
        });
    
    const result = Like.findByPk(id);

    return result.dataValues;
}

module.exports = {
    createLike,
    getLikeById,
    getLikesByUserId,
    getLikesByPostId,
    getLikeByUserPostId,
    getLikes,
    deleteLike,
    updateLike
}
