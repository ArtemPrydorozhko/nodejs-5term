const express = require('express');
const router = express.Router();

const User = require('../../database/dao/user');
const { wrapAsync } = require('../../utils/asyncWrapper');

router.get('/user/', wrapAsync(async (req, res) => {
    const users = await User.getUsers();

    res.status(200).json(users);
}));

router.get('/user/:id', wrapAsync(async (req, res) => {
    const id = req.params.id;
    const user = await User.getUserById(id);

    res.status(200).json(user);
}));

router.put('/user/:id', wrapAsync(async (req, res) => {
    const id = req.params.id;
    const user = await User.updateUser(req.body, id);

    res.status(200).json(user);
}));

router.delete('/user/:id', wrapAsync(async (req, res) => {

    const id = req.params.id;
    const post = await User.deleteUser(id);

    res.status(200).json(post);

}));

module.exports = router;