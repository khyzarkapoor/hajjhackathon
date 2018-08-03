

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//user schema
const NotificationSchema = mongoose.Schema({
    token:{
        type:String
    },
    campaign:{
        type:String
    },
    message:{
        type:String
    },
    name:{
        type:String
    },
    seen:{
        type:String
    },
    ack:{
        type:String
    },
    reported:{
        type:String
    },
    reportmsg:{
        type:String
    },
    reportedat:{
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
const Notification = module.exports = mongoose.model('Notification',NotificationSchema);











