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

taskRouter.post('/api/tasks', authenticateJWT,authorize("post"), async (req, res) => {
    try {
        const {
            name,
            description,
            dueDate,
            categoryId
        } = req.body;
        const task = await Task.create({
            name,
            description,
            dueDate,
            userId: req.userId,
            categoryId
        });
        res.json(task);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

taskRouter.put('/api/tasks/:id', authenticateJWT, authorize("put"), async (req, res) => {
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
            return res.status(404).send('Task not found');
        }
        const {
            name,
            description,
            dueDate,
            status,
            categoryId
        } = req.body;
        await task.update({
            name,
            description,
            dueDate,
            status,
            categoryId
        });
        res.json(task);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

taskRouter.get('/api/tasks/:id', authenticateJWT, authorize("get"), async (req, res) => {
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
            return res.status(404).send('Task not found');
        }
        res.json(task);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

taskRouter.delete('/api/tasks/:id', authenticateJWT, authorize("delete"), async (req, res) => {
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
            return res.status(404).send('Task not found');
        }
        await task.destroy();
        res.sendStatus(204);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = taskRouter;