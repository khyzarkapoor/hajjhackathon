
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//user schema
const CampaignnSchema = mongoose.Schema({
    name:{
        type:String,
        unique:true
    },
    message:{
        type:String
    },
    tokens:[String],
    createdby:{
        type:String
    },
    created:{
        type:String
    }
});

//to get this function from outside, export it
const Campaignn = module.exports = mongoose.model('Campaignn',CampaignnSchema);











