const express = require('express')
const router = express.Router()

//Login Page
router.get('/login',(req,res) =>{
    res.render('users/login')
})

//Register Page
router.get('/register',(req,res) =>{
    res.render('users/register')
})

//Register Post
router.post('/register',(req,res) =>{
    const { fname, mname, lname, bday, gender, phone, address, username, email, psw, psw2} = req.body
    let errors = []

    if(!fname || !mname || !lname || !bday || !gender 
        || !phone || !address || !username || !email || !psw || !psw2 ){
            errors.push({ msg: 'Please fill in all fields'})
        }

    if(psw !== psw2){
        errors.push({ msg: "Password doesn't match"})
    }

    console.log(req.body);
    
    if(errors.length > 0){
        res.render('users/register',{
            errors,
            fname,mname,lname,
            bday,gender,phone,
            address,username,
            email,psw,psw2
        })
    }else{    
        res.send('pass')
    }

})

module.exports = router
