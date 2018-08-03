
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//Haji schema
const TentSchema = mongoose.Schema({
    name:{
        type: String,
        unique:true
    },
    occupancy:{
        type:String
    },
    status:{
        type:String
    },
    occupants:[String],
    createdby:{
        type:String
    },
    created:{
        type:String
    }
});

//to get this function from outside, export it
const Tent = module.exports = mongoose.model('Tent',TentSchema);






