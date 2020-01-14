const express = require('express');
const router = express.Router();

const Group = require('../../database/dao/group');
const { wrapAsync } = require('../../utils/asyncWrapper');

router.get('/group/all', wrapAsync(async (req, res) => {
    const groups = await Group.getGroups();

    res.status(200).json(groups);
}));

router.get('/group', wrapAsync(async (req, res) => {
    const groups = await Group.getGroupsByUserId(req.user.id);

    res.status(200).json(groups);
}));

router.get('/group/:id', wrapAsync(async (req, res) => {
    const id = req.params.id;
    const group = await Group.getGroupById(id);

    res.status(200).json(group);
}));

router.put('/group/:id', wrapAsync(async (req, res) => {
    const id = req.params.id;
    const group = await Group.updateGroup(req.body, id);

    res.status(200).json(group);
}));

router.delete('/group/:id', wrapAsync(async (req, res) => {
    const id = req.params.id;
    const post = await Group.deleteGroup(id);

    res.status(200).json(post);
}));

router.post('/group/:id/removeUser', wrapAsync(async (req, res) => {
    const id = req.params.id;
    const result = await Group.removeUserFromGroup(id, req.body.userId);

    res.status(200).json(result);
}));

router.post('/group/:id/addUser', wrapAsync(async (req, res) => {
    const result = await Group.addUserToGroup(req.params.id, req.user.id);

    res.status(200).json(result);
}));

router.post('/group', wrapAsync(async (req, res) => {
    const result = await Group.createGroup(req.user.id, req.body.name);

    res.status(200).json(result);
}));

module.exports = router;