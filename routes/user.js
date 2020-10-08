const express = require('express');
const router = express.Router();

/* ***************************LOGIN PAGE************************ */
router.get('/login' , (req,res)=>{
    res.render('login');
});
/* ************************************************************* */

/* ************************REGISTER PAGE************************ */
router.get('/register' , (req,res)=>{
    res.render('register');
});
/* ************************************************************* */

/* ************************REGISTER HANDLE************************ */
router.post('/register' , (req,res)=>{
   const { name , email, password , password2 } = req.body;

   let errors = [];

   //Check required fields
   if(!name || !email || !password || !password2){
        errors.push({message : 'Please fill in all fields'});
   }

   //Check password match
   if(password !== password2){
       errors.push({message : 'Passwords do not matched'});
   }

   //Check password length
   if(password.length < 6 ){
        errors.push({message : 'Password should be at least 6 characters'});
   }

   if(errors.length > 0 ){
       res.render('register', {
           errors,
           name,
           email,
           password,
           password2
       });
   }else{
       res.send('pass');
   }
});

/* ************************************************************* */

module.exports = router;