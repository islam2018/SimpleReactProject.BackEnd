const Sequelize = require('sequelize');
const sequelize = new Sequelize('usersbd', 'debian-sys-maint', 'YtkaCyun9oqIzkNt', {
    host: 'localhost',
    //port: '3306',
    dialect: 'mysql',
    define: {
        freezeTableName: true,
        timestamps:false
    }
});


sequelize
    .authenticate().then(() => {
    console.log('Connection has been established successfully.');
})
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports=sequelize;



