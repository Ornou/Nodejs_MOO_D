const Sequelize=require('sequelize');
const sequelize = new Sequelize({
    dialect: 'mysql',
    host: '127.0.0.1',
    username: 'root',
    password: 'root',
    database: 'bdd',
    port:'3307'
});
module.exports = {sequelize}
