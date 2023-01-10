const Sequelize = require('sequelize');
const {sequelize} =require('../config/db');
const {User}=require('./user');
const {Role}=require('./role');
const {Task}=require('./task');
const {Category}=require('./category');
sequelize.sync();

User.hasMany(Task);
Category.hasMany(Task);
Task.belongsTo(User);
Task.belongsTo(Category);
module.exports={User,Role,Task,Category};
