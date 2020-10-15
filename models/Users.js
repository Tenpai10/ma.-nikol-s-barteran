const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    user_id:{
        type: Number,
        required: True
    },
    username:{
        type: String,
        required: True
    },
    email:{
        type: String,
        required: True
    },
    password:{
        type: String,
        required: True
    },
    name:{
        type: String,
        required: True
    },
    birthday:{
        type: Date,
        required: True
    },
    gender:{
        type: String,
        required: True
    },
    contact_number:{
        type:Number,
        required: True
    },
    address:{
        type: String,
        required: True
    },
    date_created:{
        type: Date,
        default: Date.now
    }

})

const User = mongoose.model('User', UserSchema)

module.exports = User;