const Sequelize = require('sequelize');
const Friend = require('../models/friend');
const User = require('../models/user');

const Op = Sequelize.Op;

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
            [Op.or]: [{ userId: userId }, { userId: friendId }],
            [Op.or]: [{ friendId: userId }, { friendId: friendId }]
        },
        raw: true
    });

    return result;
}

async function getFriendsByUserId(userId) {
    const result = await Friend.findAll({
        where: {
            [Op.or]: [{ userId: userId }, { friendId: userId }]
        },
        raw: true
    });

    let friends = [];
    for (let index = 0; index < result.length; index++) {
        const friend1 = await User.findOne({
            where: {
                id: result[index].userId
            },
            raw: true
        });

        if (friend1) 
        friends.push(friend1);

        const friend2 = await User.findOne({
            where: {
                id: result[index].friendId
            },
            raw: true
        });
        if (friend2) 
        friends.push(friend2);
        
    }
console.log(result);

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
