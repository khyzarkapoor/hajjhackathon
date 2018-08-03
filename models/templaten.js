
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//user schema
const TemplatenSchema = mongoose.Schema({
    type:{
        type: String
    },
    name:{
        type:String
    },
    desc:{
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
const Templaten = module.exports = mongoose.model('Templaten',TemplatenSchema);











