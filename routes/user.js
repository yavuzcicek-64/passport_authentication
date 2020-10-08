const express = require('express');
const router = express.Router();


router.get('/' , (req,res,next)=>{
    res.send('User Page');
});


module.exports = router;