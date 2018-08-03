
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//user schema
const FoodSchema = mongoose.Schema({
    name:{
        type:String,
        unique:true
    },
    address:{
        type:String
    },
    phone:{
        type:String
    },
    latitude:{
        type:String
    },
    longitude:{
        type:String
    },
    email:{
        type:String
    },
    password:{
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
const Food = module.exports = mongoose.model('Food',FoodSchema);











