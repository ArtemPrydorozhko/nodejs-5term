const User = require('../models/user');
const config = require('../../../config/config');
const jwt = require('jsonwebtoken');

const roles = {
    admin: 'ADMIN',
    user: 'USER'
}

async function createUser(user) {
    let usr = await User.create({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        userRole: roles.admin
    });
    let userSafe = Object.assign({}, usr.dataValues);

    delete userSafe.password;
    return userSafe;
}

async function getUserById(id) {
    let usr = await User.findByPk(id);
    let userSafe = Object.assign({}, usr.dataValues);
    delete userSafe.password;
    return userSafe;
}

async function getUsers() {
    let user = await User.findAll();
    return user;
}

async function deleteUser(user) {
    return await User.destroy({
        where: {
            id: user.id
        }
    });
}

async function updateUser(user) {
    const usr = await User.update(
        user,
        {
            where: {
                id: user.id
            }
        });

    let userSafe = Object.assign({}, usr.dataValues);
    delete userSafe.password;
    return userSafe;
}

async function getUserByCredentials(email, password) {
    const user = User.findOne({
        where: {
            email,
            password
        }
    });

    if (!user) {
        throw new Error('Cannot login');
    }

    let userSafe = Object.assign({}, user.dataValues);
    delete userSafe.password;
    return userSafe;
}

async function isEmailUnused(email) {
    const user = await User.findOne({
        where: {
            email
        }
    });

    return user ? false : true;
}

async function generateUserToken(user) {
    console.log(user);

    const token = jwt.sign(user, config.jwtSecret);
    console.log(token);
    return token;
}

module.exports = {
    createUser,
    getUserById,
    getUserByCredentials,
    generateUserToken,
    deleteUser,
    updateUser,
    isEmailUnused,
    getUsers
}
