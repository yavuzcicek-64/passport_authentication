const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');
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
       //Validation passed
        User.findOne({email : email})
        .then((user)=>{
            if(user){
                //User exist
                errors.push({message : 'Email is already registered'});
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            }else{
                const newUser = new User({
                    name,
                    email,
                    password
                });

                //hash password

                bcrypt.genSalt(10, (err,salt)=>{
                    bcrypt.hash(newUser.password, salt, (err,hash)=>{
                        if(err) throw err;
                        // set password to hashed
                        newUser.password = hash;

                        newUser.save()
                        .then((user)=>{
                            req.flash('success_message', 'You are now registered and can log in');
                            res.redirect('/users/login');
                        })
                        .catch((err)=>{
                            console.log(err);
                        })
                    });
                })

            }
        })
        .catch((err)=>{console.log(err)});

   }
});

/* ************************************************************************* */

/* ******************************LOGIN HANDLE******************************* */
router.post('/login', (req,res,next)=>{
    passport.authenticate('local' , {
        successRedirect : '/dashboard',
        failureRedirect : '/users/login',
        failureFlash : true
    })(req,res,next);

});
/* ************************************************************************* */

/*****************************LOGOUT HANDLE ********************************** */
router.get('/logout', (req,res)=>{
    req.logOut();
    req.flash('success_message', 'You are Logged out');
    res.redirect('/users/login');
});
/* ************************************************************************* */



module.exports = router;