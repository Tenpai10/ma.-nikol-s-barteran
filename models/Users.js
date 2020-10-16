const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    bday:{
        type: String,
        required: true
    },
    contact_number:{
        type:String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    date_created:{
        type: Date,
        default: Date.now
    }

})

const User = mongoose.model('User', UserSchema)

module.exports = User;