const Sequelize = require('sequelize');
const {sequelize} =require('../config/db');
const { User } = require('./user');

const Category = sequelize.define('category', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  module.exports = {Category};
