const express = require('express');
const router = express.Router();

const User = require('../../../../shared/database/models/user');

router.post('/login', async (req, res) => {
    try {
        const user = await User.getUserByCredentials(req.body.email, req.body.password);
        const token = await User.generateUserToken(user);

        res.status(200).json(token);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.post('/signup', async (req, res) => {
    try {
        if (await User.isEmailUnused(req.body.email)) {

            const user = await User.createUser(req.body);
            const token = await User.generateUserToken(user);

            res.status(201).json(token);
        } else {
            res.status(400).json({ error: 'email is used already' });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;