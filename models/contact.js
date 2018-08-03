
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//user schema
const ContactSchema = mongoose.Schema({
    fullname:{
        type: String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    token:{
        type:String
    },
    description:{
        type:String
    },
    email:{
        type:String
    },
    gender:{
        type:String
    },
    createdby:{
        type:String,
        required:true
    },
    created:{
        type:String
    }
});

//to get this function from outside, export it
const Contact = module.exports = mongoose.model('Contact',ContactSchema);











