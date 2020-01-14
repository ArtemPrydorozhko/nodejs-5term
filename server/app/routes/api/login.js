const express = require('express');
const router = express.Router();

const User = require('../../database/dao/user');
const { wrapAsync } = require('../../utils/asyncWrapper');

router.post('/login', wrapAsync(async (req, res) => {
    const user = await User.getUserByCredentials(req.body.email, req.body.password);
    const token = await User.generateUserToken(user);

    res.status(200).json(token);
}));

router.post('/signup', wrapAsync(async (req, res) => {
    if (await User.isEmailUnused(req.body.email)) {

        const user = await User.createUser(req.body);
        const token = await User.generateUserToken(user);

        res.status(201).json(token);
    } else {
        res.status(400).json({ error: 'email is used already' });
    }
}));

module.exports = router;