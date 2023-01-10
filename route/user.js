const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwtSecret = 'YOUR_SECRET_KEY';
const { authenticateJWT } = require('../middleware/auth');
const userRouter = express.Router();
const {
    User
} = require('../models');

userRouter.post('/api/users', async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            role
        } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });
        const token = jwt.sign({
            userId: user.id
        }, jwtSecret);
        res.json({
            token,
            user
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

userRouter.post('/api/sessions', async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;
        const user = await User.findOne({
            where: {
                email
            }
        });
        if (!user) {
            return res.status(401).send('User not found');
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).send('Invalid password');
        }
        const token = jwt.sign({
            userId: user.id
        }, jwtSecret);
        res.json({
            token,
            user
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

userRouter.get('/api/users/me', authenticateJWT, async (req, res) => {
    const user = await User.findByPk(req.userId);
    res.json(user);
});


module.exports = userRouter;