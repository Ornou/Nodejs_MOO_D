const express = require('express');
const taskRouter = express.Router();
const { authenticateJWT, authorize } = require('../middleware/auth');
const {
    Task
} = require('../models');



taskRouter.get('/api/tasks', authenticateJWT,authorize("get"), async (req, res) => {
    const tasks = await Task.findAll({
        where: {
            userId: req.userId
        }
    });
    res.json(tasks);
});

taskRouter.post('/tasks', authenticateJWT,authorize("post"), async (req, res) => {
    try {
        const {
            titre,
            description,
            Date,
            categoryId
        } = req.body;
        const task = await Task.create({
            titre,
            description,
            Date,
            userId: req.userId,
            categoryId
        });
        res.json(task);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

taskRouter.put('/tasks/:id', authenticateJWT, authorize("put"), async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const task = await Task.findOne({
            where: {
                id,
                userId: req.userId
            }
        });
        if (!task) {
            return res.status(404).send('Tache introuvable');
        }
        const {
            titre,
            description,
            Date,
            statut,
            categoryId
        } = req.body;
        await task.update({
            titre,
            description,
            Date,
            statut,
            categoryId
        });
        res.json(task);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

taskRouter.get('/tasks/:id', authenticateJWT, authorize("get"), async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const task = await Task.findOne({
            where: {
                id,
                userId: req.userId
            }
        });
        if (!task) {
            return res.status(404).send('Tache introuvable');
        }
        res.json(task);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

taskRouter.delete('/tasks/:id', authenticateJWT, authorize("delete"), async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const task = await Task.findOne({
            where: {
                id,
                userId: req.userId
            }
        });
        if (!task) {
            return res.status(404).send('Tache introuvable');
        }
        await task.destroy();
        res.sendStatus(204);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = taskRouter;