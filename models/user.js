const {Datatypes, DataTypes} = require('sequelize')
const DB=require('../db.config')
const User=Db.define('User',{
    id:{
        type:Datatypes.INTEGER(10),
        primarykey:true,
        autoIncrement:true
    },
    pseudo:{
        type:Datatypes.STRING(100),
        allowNull:false,
        unique:true
    },
    email:{
        type:Datatypes.STRING,
        validate:{
            isEmail:true
        }
    },
    password:{
        type:DataTypes.STRING(64),
        is: /^[0-9a-f](64)$/i
    }

},{paranoid:true})
module.exports=User