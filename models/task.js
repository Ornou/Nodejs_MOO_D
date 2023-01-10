const Sequelize = require('sequelize');
const {sequelize} =require('../config/db');

const Task = sequelize.define('task', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  dueDate: {
    type: Sequelize.DATE,
    allowNull: true
  },
  status: {
    type: Sequelize.ENUM('pending', 'completed'),
    defaultValue: 'pending'
  }
});

module.exports = {Task};

