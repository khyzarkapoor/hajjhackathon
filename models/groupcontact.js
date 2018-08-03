
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//user schema
const GroupcontactSchema = mongoose.Schema({
    name:{
        type: String
    },
    contact:{
        type:String
    },
    group:{
        type:mongoose.Schema.Types.ObjectId
    }
});

//to get this function from outside, export it
const Groupcontact = module.exports = mongoose.model('Groupcontact',GroupcontactSchema);









