const express = require('express');
const router = express.Router();

/* ***************************LOGIN PAGE************************ */
router.get('/login' , (req,res,next)=>{
    res.render('login');
});
/* ************************************************************* */

/* ************************REGISTER PAGE************************ */
router.get('/register' , (req,res,next)=>{
    res.render('register');
});
/* ************************************************************* */

module.exports = router;