const Sequelize = require('sequelize');
const sequelize=require('../config/sequelize.config');
const Picture=sequelize.define('picture',
    {
        idPic:{type:Sequelize.INTEGER,primaryKey: true, autoIncrement: true},
        id:{type:Sequelize.INTEGER},
        path:{type:Sequelize.STRING}

    });

module.exports=Picture;
