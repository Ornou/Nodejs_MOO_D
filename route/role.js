const express = require('express');
const { authenticateJWT, authorize } = require('../middleware/auth');
const roleRouter = express.Router();
const {
    Role
} = require('../models');

roleRouter.get('/api/roles', authenticateJWT, authorize("get"), async (req, res) => {
    const roles = await Role.findAll();
    res.json(roles);
});

roleRouter.post('/api/roles', authenticateJWT, async (req, res) => {
    try {
        const {
            name,
            roles
        } = req.body;
        const role = await Role.create({
            name,
            roles
        });
        res.json(role);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

roleRouter.put('/api/roles/:name', authenticateJWT, async (req, res) => {
    try {
        const {
            name
        } = req.params;
        const role = await Role.findByPk(name);
        if (!role) {
            return res.status(404).send('Role not found');
        }
        const {
            roles
        } = req.body;
        await role.update({
            roles
        });
        res.json(role);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

roleRouter.get('/api/roles/:name', authenticateJWT, authorize("get"), async (req, res) => {
    try {
        const {
            name
        } = req.params;
        const role = await Role.findByPk(name);
        if (!role) {
            return res.status(404).send('Role not found');
        }
        res.json(role);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

roleRouter.delete('/api/roles/:name', authenticateJWT, authorize("delete"), async (req, res) => {
    try {
        const {
            name
        } = req.params;
        const role = await Role.findByPk(name);
        if (!role) {
            return res.status(404).send('Role not found');
        }
        await role.destroy();
        res.json("Role supprimer");
    } catch (error) {
        res.status(400).send(error.message);
    }
});


module.exports = roleRouter;