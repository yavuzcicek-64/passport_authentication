const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();



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