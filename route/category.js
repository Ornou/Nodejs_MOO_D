const express = require('express');
const categoryRouter = express.Router();
const { authenticateJWT, authorize } = require('../middleware/auth');
const {
    Category
} = require('../models');

categoryRouter.get('/api/categories', authenticateJWT, authorize("get"), async (req, res) => {
    const categories = await Category.findAll();
    res.json(categories);
});

categoryRouter.post('/api/categories', authenticateJWT , authorize("post"), async (req, res) => {
    try {
        const {
            name
        } = req.body;
        const category = await Category.create({
            name
        });
        res.json(category);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

categoryRouter.put('/api/categories/:id', authenticateJWT , authorize("put"), async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).send('Category not found');
        }
        const {
            name
        } = req.body;
        await category.update({
            name
        });
        res.json(category);
    } catch (error) {
        res.status(400).send(error.message);
    }
});
categoryRouter.get('/api/categories/:id', authenticateJWT , authorize("get"), async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).send('Category not found');
        }
        res.json(category);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

categoryRouter.delete('/api/categories/:id', authenticateJWT, authorize("delete"), async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).send('Category not found');
        }
        await category.destroy();
        res.sendStatus(204);
    } catch (error) {
        res.status(400).send(error.message);
    }
});


module.exports = categoryRouter;