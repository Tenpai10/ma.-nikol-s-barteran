const router = require('express').Router()
const bcrypt = require('bcryptjs')

//User model
const User = require('../models/Users')

//Login Page
router.get('/login',(req,res) =>{
    res.render('users/login')
})

//Register Page
router.get('/register',(req,res) =>{
    res.render('users/register')
})

//Register Handle
router.post('/register',(req,res) =>{
    let { fname, mname, lname, month, day, year, contact_number, address, username, email, password, password2} = req.body
    let errors = []
    
    console.log(req.body)
    if(password !== password2){
        errors.push({ msg: "* Password doesn't match"})
    }

    if(password.length < 8){
        errors.push({ msg: "* Password should be at least 8 characters"})
    }

    if(errors.length > 0){
        res.render('users/register',{
            errors,
            fname,mname,lname,
            contact_number,
            address,username,
            email
        })
    }else{    
        // VALIDATION

        //Check if username is unique
        User.findOne({username: username})
            .then(user => {
                if(user){
                    //Username already taken
                    errors.push({ msg: "* Username already taken"})
                    res.render('users/register',{
                        errors,
                        fname,mname,lname,
                        contact_number,
                        address
                    })
                }
            })
        //Check if email is unique
        User.findOne({ email: email})
            .then(user => {
                if(user){
                    //Email already exists
                    errors.push({ msg: "* Email already exists"})
                    res.render('users/register',{
                        errors,
                        fname,mname,lname,
                        contact_number,
                        address,username
                    })
                } else {
                    let name = fname + " " + mname + " " + lname
                    let bday = month + " " + day + ", " + year

                    // Hash Password
                    bcrypt.genSalt(10, (err,salt)=> 
                        bcrypt.hash(password, salt, (err,hash) =>{
                            // Set password to hash
                            password = hash

                        })
                    )

                    //Create User Instance
                    const newUser = new User ({
                        username,
                        email,
                        password,
                        name,
                        bday,
                        contact_number,
                        address
                    })

                    // Save user
                    newUser.save()
                        .then(user =>{
                            res.redirect('login')
                        })
                        .catch(err => console.log(err))
                    
                }                
            })
    }

})

module.exports = router
