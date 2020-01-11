const express = require('express');
const router = express.Router();

const Group = require('../../database/dao/group');

router.get('/group/all', async (req, res) => {
    try {
        const groups = await Group.getGroups();
        console.log(groups);
        res.status(200).json(groups);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.get('/group', async (req, res) => {
    try {
        const groups = await Group.getGroupsByUserId(req.user.id);
        console.log(groups);
        
        res.status(200).json(groups);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.get('/group/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const group = await Group.getGroupById(id);
        console.log(group);
        res.status(200).json(group);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.put('/group/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const group = await Group.updateGroup(req.body, id);
        
        res.status(200).json(group);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.delete('/group/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Group.deleteGroup(id);

        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.post('/group/:id/removeUser', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Group.removeUserFromGroup(id, req.body.userId);

        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.post('/group/:id/addUser', async (req, res) => {
    try {
        const result = await Group.addUserToGroup(req.params.id, req.user.id);
        console.log(result);

        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.post('/group', async (req, res) => {
    try {
        const result = await Group.createGroup(req.user.id, req.body.name);
        console.log(result);

        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;