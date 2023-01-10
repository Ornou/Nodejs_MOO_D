const Sequelize = require('sequelize');
// Connexion à la base de données
const sequelize = new Sequelize({
    dialect: 'mysql',
    host: '127.0.0.1',
    username: 'root',
    password: '',
    database: 'node_bd'
});
module.exports = {sequelize}