
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//user schema
const GroupSchema = mongoose.Schema({
    name:{
        type: String,
        required:true,
        unique:true
    },
    description:{
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
const Group = module.exports = mongoose.model('Group',GroupSchema);









