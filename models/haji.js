
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//Haji schema
const HajiSchema = mongoose.Schema({
    fullname:{
        type: String
    },
    phone:{
        type:String,
        required:true
    },
    passport:{
        unique:true,
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    pin:{
        type:String,
        required:true
    },
    khema:{
        type:String,
        required:true
    },
    transport:{
        type:String,
        required:true
    },
    account:{
        type:String,
        required:true
    },    
    token:{
        type:String
    },
    latitude:{
        type:String
    },
    longitude:{
        type:String
    },
    createdby:{
        type:String
    },
    created:{
        type:String
    }
});

//to get this function from outside, export it
const Haji = module.exports = mongoose.model('Haji',HajiSchema);






