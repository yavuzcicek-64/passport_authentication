const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
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

/* **************************TEMPLATE ENGINE*********************************** */
app.use(ejsLayouts);
app.set('view engine','ejs');
/* **************************************************************************** */

/* ***************************ROUTES******************************************* */
app.use('/' , require('./routes/index'));
app.use('/users' , require('./routes/user'));
/* **************************************************************************** */

const PORT = process.env.PORT || 5000;
app.listen(PORT , console.log('Server start on port : ${PORT}'));