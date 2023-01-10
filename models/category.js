const Sequelize = require('sequelize');
const sequelize=require('--/models/index');
const Category = sequelize.define('category', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
  Category.hasMany(Task);
  module.exports = {Category};
