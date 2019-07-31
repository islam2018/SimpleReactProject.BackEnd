const Sequelize = require('sequelize');
const sequelize=require('../config/sequelize.config');
const User=sequelize.define('user',
    {
        id:{type:Sequelize.INTEGER,primaryKey: true, autoIncrement: true},
        firstname:{type:Sequelize.STRING},
        lastname:{type:Sequelize.STRING},
        birthday:{type:Sequelize.STRING},
        email:{type:Sequelize.STRING},
        phone:{type:Sequelize.STRING},
        adress:{type:Sequelize.STRING},

    });

module.exports=User;
