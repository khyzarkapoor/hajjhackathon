
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//Haji schema
const TransportSchema = mongoose.Schema({
    vid:{
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
    date:{
        type:String
    },
    time:{
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
const Transport = module.exports = mongoose.model('Transport',TransportSchema);






