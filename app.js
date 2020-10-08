const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const app = express();

/* **************************DB CONFIG AND CONNECTION************************* */
const db = require('./config/keys').MongoURI;
mongoose.connect(db , {useNewUrlParser:true ,useUnifiedTopology : true})
.then(()=>{
    console.log('MONGO DB CONNECTED !'
    )})
.catch((err)=>{
    console.log(err)
});
/* **************************************************************************** */

/* ******************************VİEW ENGINE*********************************** */
app.use(ejsLayouts);
app.set('view engine','ejs');
/* **************************************************************************** */

/* ******************************BODY PARSER*********************************** */
app.use(express.urlencoded({extended : false}));
/* **************************************************************************** */

/* **************************EXPRESS SESSION*********************************** */
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}));
/* **************************************************************************** */

/* **************************CONNECT FLASH************************************* */
app.use(flash());
/* **************************************************************************** */

/* **************************GLOBAL VARIABLES********************************** */
app.use((req,res,next)=>{
    res.locals.success_message = req.flash('success_message');
    res.locals.error_message = req.flash('error_message');
    next();
});
/* **************************************************************************** */

/* ***************************ROUTES******************************************* */
app.use('/' , require('./routes/index'));
app.use('/users' , require('./routes/user'));
/* **************************************************************************** */

const PORT = process.env.PORT || 5000;
app.listen(PORT , console.log('Server start on port : ${PORT}'));