
module.exports = (sequelize,Sequelize) => {
    const User = sequelize.define('users', {
        
        username:{
            type: Sequelize.STRING(100),
            allowNull: false,
            unique: true
        },
        email:{
            type: Sequelize.STRING(100),
            validate:{
                isEmail: true        
            }
        },
        password:{
            type: Sequelize.STRING(64),
            validate:{
                len:[6]
            }   
    }});return User;};           