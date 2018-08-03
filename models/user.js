
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//user schema
const UserSchema = mongoose.Schema({
    fullname:{
        type: String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    rights:[String],
    isparent:{
        type:Boolean
    },
    parent:{
        type:String
    },
    created:{
        type:String
    }
});

//to get this function from outside, export it
const User = module.exports = mongoose.model('User',UserSchema);


module.exports.getUserById = function(id, callback){
    User.findById(id,callback);
}

module.exports.getUserByEmail = function(email, callback){
    const query = {email: email};
    User.findOne(query,callback);
}

module.exports.addUser = function(newUser, callback){
    
    bcrypt.genSalt(10, (err,salt)=>{
        bcrypt.hash(newUser.password,salt,(err,hash)=>{
            if(err){
                throw err;
                //res.json({success:false,msg:err});
            }else{
                //res.json({success:false,msg:err});
                newUser.password = hash;
                newUser.save(callback);
            }
            
        });
    });
    
}



module.exports.comparePassword = function(password,hash,callback){
    bcrypt.compare(password,hash,(err,isMatch)=>{
        if(err) throw err;
        callback(null,isMatch);
    });
}







