const Sequelize = require('sequelize');
const {sequelize} =require('../config/db');

const Role = sequelize.define('role', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true, 
  },
  roles:{
    type:Sequelize.TEXT,
    allowNull: false,
    defaultValue: 'get'
  }
});

module.exports = {Role};