
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Haji = require('../models/haji');
const Tent = require('../models/tent');
const Transport = require('../models/transport');
const Food = require('../models/food');
const Transaction = require('../models/transaction');
const Useraccess = require('../models/useraccess');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const bcrypt = require('bcryptjs');


//register
router.post('/register', (req, res, next)=>{
    //res.send("Register");
    let haji = new Haji({
        fullname:req.body.fullname,
        phone:req.body.phone,
        passport:req.body.passport,
        age:req.body.age,
        pin:req.body.pin,
        khema:req.body.khema,
        transport:req.body.transport,
        account:req.body.account,
        token:'',
        latitude:'',
        longitude:'',
        createdby:req.body.createdby,
        created:new Date().toLocaleDateString('en-US')
    });

    haji.save((err,haji)=>{
        if(err){
            res.json({success:false,msg:"Failed to register user."});
        }else{
            // push user to housing occupants
            const hquery = {
                _id:req.body.khema
            }
            const hupdate = {
                $push : {
                    occupants : haji._id
                }
            }
            const tquery = {
                _id:req.body.transport
            }
            const tupdate = {
                $push : {
                    occupants : haji._id
                }
            }
            Tent.update(hquery,hupdate,(err,raw)=>{
                if(err){
                    console.log('tent',err);
                }else{
                    Transport.update(tquery,tupdate,(err,raw)=>{
                        if(err){
                            console.log('transport',err);
                        }else{
                            res.json({success:true, msg:"User registered", haji:haji});
                        }
                    });
                }
            });

            //push user to transport occupants



            
        }
    });

});

router.get('/:email',(req,res)=>{
    const query =  {createdby:req.params.email}; 
    Haji.find(query,(err,docs)=>{
        if(err){
            res.json({success:false,msg:"Failed to register user."});
        }else{
            res.json({success:true, data:docs});
        }
    });
});

// add something here
router.get('/account/balance',(req,res)=>{

    var id = "5b5d918618b08a1d94dced6c";
    
    var amount = "100";

    const query =  {
        _id:id
    };

    // console.log('my nigga');
    
    
    Haji.findOne(query,(err,docs)=>{
        if(err){
            console.log(err);
            
        }else{
            
            var oldbal = parseInt(docs.account);
            var newbal = oldbal + parseInt(amount);
            console.log(newbal);

            docs.account = ''+newbal;
            
            
            docs.save((err,raw)=>{
                if(err){
                    console.log(err);
                }
                console.log(raw);
            })
            // docs.account
            
            
        }
    });





    // const update = {
    //     $set : {

    //     }
    // }


    // Haji.update(query,{})



});



router.post('/tent/register', (req, res, next)=>{
    //res.send("Register");
    let tent = new Tent({
        name:req.body.name,
        occupancy:req.body.occupancy,
        status:'Active',
        occupants:[],
        createdby:req.body.createdby,
        created:new Date().toLocaleDateString('en-US')
    });

    tent.save((err,tent)=>{
        if(err){
            res.json({success:false,msg:"Failed to register user."});
        }else{
            res.json({success:true, msg:"User registered", tent:tent});
        }
    });

});

router.get('/tent/:email',(req,res)=>{
    const query =  {createdby:req.params.email}; 
    Tent.find(query,(err,docs)=>{
        if(err){
            res.json({success:false,msg:"Failed to register user."});
        }else{
            res.json({success:true, data:docs});
        }
    });
});



router.post('/transport/register', (req, res, next)=>{
    //res.send("Register");
    let transport = new Transport({
        vid:req.body.vid,
        occupancy:req.body.occupancy,
        status:'Active',
        occupants:[],
        date:req.body.date,
        time:req.body.time,
        createdby:req.body.createdby,
        created:new Date().toLocaleDateString('en-US')
    });

    transport.save((err,transport)=>{
        if(err){
            res.json({success:false,msg:"Failed to register user."});
        }else{
            res.json({success:true, msg:"User registered", transport:transport});
        }
    });

});

router.get('/transport/:email',(req,res)=>{
    const query =  {createdby:req.params.email}; 
    Transport.find(query,(err,docs)=>{
        if(err){
            res.json({success:false,msg:"Failed to register user."});
        }else{
            res.json({success:true, data:docs});
        }
    });
});



router.post('/food/register', (req, res, next)=>{
    //res.send("Register");
    let food = new Food({
        name:req.body.name,
        address:req.body.address,
        phone:req.body.phone,
        latitude:req.body.latitude,
        longitude:req.body.longitude,
        email:req.body.email,
        password:req.body.password,
        createdby:req.body.createdby,
        created:new Date().toLocaleDateString('en-US')
    });

    food.save((err,food)=>{
        if(err){
            res.json({success:false,msg:"Failed to register user."});
        }else{
            res.json({success:true, msg:"User registered", food:food});
        }
    });

});

router.get('/food/:email',(req,res)=>{
    const query =  {createdby:req.params.email}; 
    Food.find(query,(err,docs)=>{
        if(err){
            res.json({success:false,msg:"Failed to register user."});
        }else{
            res.json({success:true, data:docs});
        }
    });
});

router.get('/food/single/:outlet',(req,res)=>{

    var re = JSON.parse(req.params.outlet);
    
    const query =  {
        email:re.email,
        password:re.password
    }; 
    Food.findOne(query,(err,docs)=>{
        if(err){
            res.json({success:false,msg:"Failed to register user."});
        }else{
            if(docs==null){
                res.json({success:false,msg:"Failed to register user."});
                console.log('not found');
            }
            //console.log(docs);
            
            res.json({success:true, outlet:docs});
        }
    });
});



router.post('/transaction/register', (req, res, next)=>{
    Haji.findOne({passport:req.body.qrcode,pin:req.body.pin},(err,docs)=>{
        if(err){
            res.json({success:false,msg:err});
        }else{
            //console.log(docs);
            
            if(parseInt(req.body.amount) > parseInt(docs.account)){
                res.json({success:false,msg:"Not enough balance"});
            }else{
                const transaction = new Transaction({
                    outlet:req.body.outlet,
                    name:req.body.name,
                    amount:req.body.amount,
                    haji:docs._id,
                    hajiname:docs.fullname,
                    passport:docs.passport,
                    housing:docs.khema,
                    created:''+Date.now()
                });

                //console.log(transaction);
                

                transaction.save((err,dox)=>{
                    if(err){
                        res.json({success:false,msg:err});
                    }else{
                        res.json({success:true, msg:"registered", transaction:dox});
                    }
                })
            }
        }
    });

});

router.get('/transaction/all/',(req,res)=>{

    Transaction.find({},{},{sort : {created:-1}},(err,docs)=>{
        if(err){
            res.json({success:false,msg:"Failed to register user."});
        }else{
            res.json({success:true, data:docs});
        }
    });
});

router.get('/transaction/:haji',(req,res)=>{

    Transaction.find({haji:req.params.haji},{},{sort : {created:-1}},(err,docs)=>{
        if(err){
            res.json({success:false,msg:"Failed to register user."});
        }else{
            if(docs==null){
                res.json({success:false,msg:"Failed to register user."});
                console.log('not found');
            }
            //console.log(docs);
            
            res.json({success:true, data:docs});
        }
    });
});

router.get('/transaction/outlet/:outlet',(req,res)=>{

    Transaction.find({outlet:req.params.outlet},{},{sort : {created:-1}},(err,docs)=>{
        if(err){
            res.json({success:false,msg:"Failed to register user."});
        }else{
            if(docs==null){
                res.json({success:false,msg:"Failed to register user."});
                console.log('not found');
            }
            //console.log(docs);
            
            res.json({success:true, data:docs});
        }
    });
});

//export
module.exports = router;