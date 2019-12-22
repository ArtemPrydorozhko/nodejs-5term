const Friend = require('../models/friend');
const User = require('../models/user');

async function createFriend(friendId, userId) {
    const result = await Friend.create({
        friendId,
        userId
    });

    return result.dataValues;
}

async function areUsersFriends(friendId, userId) {
    const result = await Friend.findOne({
        where: {
            userId,
            friendId
        },
        raw: true
    });

    return result;
}

async function getFriendsByUserId(userId) {
    const result = await Friend.findAll({
        where: {
            userId
        },
        raw: true
    });

    let friends = [];
    for (let index = 0; index < result.length; index++) {
        const friend = await User.findOne({
            where: {
                id: result[index].friendId
            },
            raw: true
        });
        
        friends.push(friend);
    }

    return friends;
}

async function getFriends() {
    return await Friend.findAll();
}

async function deleteFriend(friendId, userId) {
    const result = await Friend.destroy({
        where: {
            friendId,
            userId
        }
    });

    return result;
}

module.exports = {
    createFriend,
    getFriendsByUserId,
    getFriends,
    deleteFriend,
    areUsersFriends
}
