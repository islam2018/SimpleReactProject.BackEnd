
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb',extended:true}));

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','X-Requested-With, Origin, Content-Type, Authorization, Form-Data');
    res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE');
    next();
});

app.use('',require('./Routes/User'));


module.exports=app;
