
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//Haji schema
const TransactionSchema = mongoose.Schema({
    outlet:{
        type: String
    },
    name:{
        type:String
    },
    amount:{
        type:String
    },
    haji:{
        type:String
    },
    hajiname:{
        type:String
    },
    passport:{
        type:String
    },
    housing:{
        type:String
    },
    created:{
        type:String
    }
});

//to get this function from outside, export it
const Transaction = module.exports = mongoose.model('Transaction',TransactionSchema);






