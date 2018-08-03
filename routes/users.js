
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Useraccess = require('../models/useraccess');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const bcrypt = require('bcryptjs');

router.delete('/:id',(req,resp)=>{
    let query = {_id:req.params.id};
    User.remove(query,(err)=>{
        if(err){
            resp.json({
                success:false,
                msg:'The child was not deleted'
            });
        }else{
            resp.json({
                success:true,
                msg:'The child was deleted'
            });
        }
    });
});

router.get('/childs/:parentemail',(req,res)=>{
    let query = {parent:req.params.parentemail};
    let data = {};
    User.find(query,(err,resp)=>{
        data = resp;
        res.send({
            success:true,
            data:data
        });
    });
});

router.put('/rights',(req,resp)=>{
    var rights = req.body.rights;
    var email = req.body.email;

    //console.log(rights);

    let query = {email:email};
    let data = {};
    User.findOne(query,(err,doc)=>{

        doc.rights = rights;

        doc.save(function(err){
            if(err){
                resp.json({
                    success:false,
                    msg:'Rights were not updated'
                });
            }else{
                resp.json({
                    success:true,
                    msg:'Rights updated successfully'
                });
            }
        });
    });
});

router.get('/rights/:email',(req,res)=>{
    let query = {email:req.params.email};
    let data = {};
    User.find(query,(err,resp)=>{
        data = resp;
        res.send({
            success:true,
            data:data
        });
    });
});

//register
router.post('/register', (req, res, next)=>{
    //res.send("Register");
    let newUser = new User({
        fullname: req.body.fullname,
        email:req.body.email,
        phone:req.body.phone,
        password:req.body.password,
        rights:req.body.rights,
        isparent:req.body.isparent,
        parent:req.body.parent,
        created:new Date().toLocaleDateString("en-US")
    });

    User.addUser(newUser, (err,user)=>{
        if(err){
            res.json({success:false,msg:"Failed to register user."});
        }else{
            res.json({success:true, msg:"User registered"});

        }
    });
});



//authenticate
router.post('/authenticate', (req, res, next)=>{
    const email = req.body.email;
    const password = req.body.password;

    User.getUserByEmail(email, (err,user)=>{
        if(err){
            throw err;
        }

        if(!user){
            return res.json({success:false, msg:'user not found'});
        }

        User.comparePassword(password, user.password, (err, isMatch)=>{
            if(err) throw err;
            if(isMatch){

                //create token
                const token = jwt.sign(user.toJSON(),config.secret,{
                    expiresIn:604800 //1 week in seconds
                });


                res.json({
                    success:true,
                    token:'bearer '+token,
                    user:{
                        id:user._id,
                        fullname:user.fullname,
                        email:user.email,
                        rights:user.rights
                    }
                });
            }else{
                return res.json({success:false, msg:'wrong password'});
            }
        });
    });
});

//profile protected route
router.get('/profile', passport.authenticate('jwt',{session:false}), (req, res, next)=>{
    res.send(req.user);
});



//profileupdate
router.put('/profile', (req, res, next)=>{
    //res.send("Register");
    let user = {
        fullname: req.body.fullname,
        email:req.body.email,
        phone:req.body.phone,
        password:req.body.password,
        id:req.body.id
    };

    let query = {_id:user.id};

    User.findOne(query,function(err,doc){
        if(!doc)
            return next(new Error('Could not load document'));
        else{
            //console.log(doc);
            doc.fullname = user.fullname;
            doc.phone = user.phone;

            if(user.password == undefined){
                //retain the older one
                user.password = doc.password;

                doc.save(function(err){
                    if(err){
                        res.json({success:false,msg:"User was not updated"});
                    }else{
                        // generate the updated token
                        const token = jwt.sign(user,config.secret,{
                            expiresIn:604800 //1 week in seconds
                        });
    
                        // send the updated token alongwith the request
                        res.json({success:true,msg:'User was updated',token:'bearer '+token, user:user});
                    }
                });
                // password was not changed
            }else{
                // password was changed
                bcrypt.genSalt(10, (err,salt)=>{
                    bcrypt.hash(user.password,salt,(err,hash)=>{
                        if(err){
                            throw err;
                            //res.json({success:false,msg:err});
                        }else{
                            //res.json({success:false,msg:err});
                            doc.password = hash;
                            user.password = hash;

                            //newUser.save(callback);
                            doc.save(function(err){
                                if(err){
                                    res.json({success:false,msg:"User was not updated"});
                                }else{
                                    // generate the updated token
                                    const token = jwt.sign(user,config.secret,{
                                        expiresIn:604800 //1 week in seconds
                                    });
                
                                    // send the updated token alongwith the request
                                    res.json({success:true,msg:'User was updated',token:'bearer '+token, user:user});
                                }
                            });
                        }
                        
                    });
                });
                //doc.password = user.password;
            }

        }
    });


    // User.update(query,)

    // console.log(user);



    // User.addUser(newUser, (err,user)=>{
    //     if(err){
    //         res.json({success:false,msg:"Failed to register user."})
    //     }else{
    //         res.json({success:true, msg:"User registered"})
    //     }
    // });
});



//export
module.exports = router;