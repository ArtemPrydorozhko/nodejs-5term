const express = require('express');
const router = express.Router();

const User = require('../../database/dao/user');

router.get('/user/', async (req, res) => {
    try {
        const users = await User.getUsers();

        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.get('/user/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.getUserById(id);

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.put('/user/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.updateUser(req.body, id);

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.delete('/user/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const post = await User.deleteUser(id);

        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;