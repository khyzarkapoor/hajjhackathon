
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//user schema
const UseraccessSchema = mongoose.Schema({
    userid:{
        type: String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
});

//to get this function from outside, export it
const Useraccess = module.exports = mongoose.model('Useraccess',UseraccessSchema);


module.exports.getUseraccessById = function(id, callback){
    Useraccess.findById(id,callback);
}

module.exports.getUseraccessByUserId = function(userid, callback){
    const query = {userid: userid};
    Useraccess.findAll(query,callback);
}

module.exports.addUseraccess = function(newUserAccess, callback){

    newUserAccess.save(callback);
}







