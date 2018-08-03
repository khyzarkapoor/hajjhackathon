
const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');
const Group = require('../models/group');
const Haji = require('../models/haji');
const Groupcontact = require('../models/groupcontact');

const config = require('../config/database');
const bcrypt = require('bcryptjs');
const mongoose = require ('mongoose');

const async = require('async');



//register mask
router.post('/register', (req, res, next)=>{
    //res.send("Register");
    let newContact = new Contact({
        fullname: req.body.fullname,
        phone:req.body.phone,
        token:req.body.token,
        description:req.body.description,
        email:req.body.email,
        gender:req.body.gender,
        createdby:req.body.createdby,
        created:new Date().toLocaleDateString("en-US")
    });

    newContact.save((err,contact)=>{
        if(err){
            throw err;
        }else{
            res.json({
                success:true,
                contact:contact
            });
        }
    });
});


//register mask
router.post('/group/register/', (req, res, next)=>{
    //res.send("Register");
    let newGroup = new Group({
        name: req.body.name,
        description:req.body.description,
        createdby:req.body.createdby,
        created:new Date().toLocaleDateString("en-US")
    });

    var arr=[];
    var groupcontacts = [];

    arr = req.body.contacts;


    newGroup.save((err,group)=>{
        if(err){
            res.json({
                success:false,
                msg:"duplicate entry"
            });
        }else{

            arr.forEach(function(element) {
                let newGroupcontacts = {
                    name:''+element.name,
                    contact:''+element.contact,
                    group:group._id
                }
                groupcontacts.push(newGroupcontacts);
                    
            }, this);

            
            Groupcontact.insertMany(groupcontacts,(err,doc)=>{
                if(err){
                    res.json({
                        success:false,
                        msg:"duplicate entry"
                    });
                }else{
                    res.json({
                        success:true,
                        group:group
                    });
                }
            });
            
        }
    });
});

router.get('/group/:email',(req,resp)=>{
    let query = {createdby:req.params.email};
    var response = {};
    Group.find(query,(err,doc)=>{
        if(err){
            throw err;
        }else{
            //console.log(doc);

            var arr = [];

            Group.aggregate([
                {
                    $lookup:{
                        "from":"groupcontacts",
                        "localField":"_id",
                        "foreignField":"group",
                        "as":"contacts"
                    }
                }
            ]).exec(function(err,docs){
                // console.log(err);
                resp.json({
                    success:true,
                    data:docs
                });
                //console.log(docs);
            });

            // traverse all the groups
            // doc.forEach(function(group) {
                
            //     // find adjacent contacts
            //     Groupcontact.find({group:group._id}).exec()
            //     .then(function(contacts){
            //         let group = {
            //             group:group,
            //             contacts:contacts
            //         }
            //         arr.push(group);
            //         new Promise.all(arr);
            //     })
            //     .then(function(){
            //         console.log(arr);
            //     })
            //     .catch(function(err){

            //     });

            // }, this);


            

            // doc.forEach(function(element) {
            //     Groupcontact.find({group:element._id}).exec()
            //     .then(function(group){
                    
            //         contactsArr.push(group);
            //         return Promise.all(contactsArr);
            //         //console.log(g);
            //     })
            //     .then(function(savedarr){
            //         let c = {
            //             group:element,
            //             contacts:contactsArr
            //         }
            //         newgroups.push(c);
            //         return Promise.all(newgroups);
            //     })
            //     .then(function(gr){
            //         console.log(gr);
            //     })
            //     .catch(function(err){

            //     });
            // }, this);

            //console.log(newgroups);

            
        }
    });
});









router.get('/id/:id',(req,resp)=>{
    let query = {_id:req.params.id};
    Contact.findOne(query,(err,doc)=>{
        if(err){
            throw err;
        }else{
            //console.log(doc);
            resp.json({
                success:true,
                data:doc
            });
        }
    });
});

router.get('/:email',(req,resp)=>{
    let query = {createdby:req.params.email};
    Contact.find(query,(err,doc)=>{
        if(err){
            throw err;
        }else{
            //console.log(doc);
            resp.json({
                success:true,
                data:doc
            });
        }
    });
});

router.get('/group/inside/:id',(req,res)=>{
    query = {
        group:req.params.id
    };
    project = {
        contact:1
    }
    Groupcontact.find(query,project,(err,doc)=>{
        if(err){
            res.json({
                success:false
            });
        }else{
            let arr = [];
            doc.forEach(element => {
                arr.push(element.contact);    
            });
            
            // find all the hajis where _id in arr
            let hq = {
                _id:{
                    $in:arr
                }
            }

            let otherarr= [];

            Haji.find(hq,(err,docs)=>{
                docs.forEach(element => {
                    otherarr.push(element.token);
                });

                res.json({
                    success:true,
                    tokens:otherarr
                });
            });
        }
    });
});

router.get('/group/details/:email',(req,resp)=>{
    let query = {createdby:req.params.email};

    var contactids = [];

    Group.findOne(query,(err,group)=>{

        //console.log(group.contacts);
        group.contacts.forEach(function(element) {
            contactids.push(element.contact);
        }, this);

        //console.log(contactids);

        Contact.find(
            {
                _id:{
                    $in:contactids
                }
            },
            (err,contact)=>{
                console.log(contact);
            }
        );
    });


    
});

router.delete('/:id',(req,resp)=>{
    let query = {_id:req.params.id};
    Contact.remove(query,(err)=>{
        if(err){
            resp.json({
                success:false,
                msg:'The contact was not deleted'
            });
        }else{
            resp.json({
                success:true,
                msg:'The contact was deleted'
            });
        }
    });
});

router.delete('/group/:id',(req,resp)=>{
    let query = {_id:req.params.id};

    Group.remove(query,(err)=>{
        if(err){
            resp.json({
                success:false,
                msg:'The group was not deleted'
            });
        }else{
            resp.json({
                success:true,
                msg:'The group was deleted'
            });
        }
    });
});

router.put('/group',(req,resp)=>{
    let contacts = req.body.contacts;
    let gid = req.body.group;    
    var objectId = mongoose.Types.ObjectId(gid);

    var groupcontacts = [];
    var contactids = [];

    contacts.forEach(function(element) {
        let n = {
            name:element.name,
            contact:element.contact,
            group:objectId
        }
        contactids.push(element.contact);
        groupcontacts.push(n);
    }, this);

    

    // groupcontacts.forEach(function(element) {
    //     Groupcontact.update({group:objectId},{$set:{name:element.name, contact:element.contact , group: element.group}},{upsert:true,overwrite:true},(err,f)=>{
    //         console.log(err);
    //         console.log(f);
    //     })
    // }, this);

    async.each(groupcontacts, function(groupcontact,callback){
        Groupcontact.findOneAndUpdate(
            {
                $and:[
                    {group: groupcontact.group},
                    {contact:groupcontact.contact}
                ]
            }, 
            groupcontact, 
            {upsert:true}, 
            function(err, doc){
                if(err){
                return callback(err);
                }
                return callback();
            });
    },function(err){
        if(err){
            console.log(err);
            resp.json(
                {
                    success:false
                }
            );
        }
        else{
            resp.json(
                {
                    success:true
                }
            );
            console.log("All pool items have been upserted!")
        }
    });

    // Groupcontact.updateMany({group:objectId},groupcontacts,{overwrite:true, upsert:true},(err,raw)=>{
    //     console.log(err);
    //     console.log(raw);
    // })


    //Groupcontact.updateMany()
    // Groupcontact.insertMany(groupcontacts,(err,doc)=>{
    //     console.log(doc);
    // });

    //console.log(groupcontacts);
});

router.delete('/group/contact/:contact',(req,resp)=>{
    let contact = req.params.contact;
    let contactobj = JSON.parse(contact);

    // groupid and contactid

    Groupcontact.remove(
        {
            contact:contactobj.contactid,
            group:contactobj.groupid
        },
        (err=>{
            if(err){
                
                resp.json({
                    success:false
                });
            }else{
                resp.json({
                    success:true
                }); 
            }
        })
    )

    let group={_id:contactobj.groupid};
    // Group.findOne(group,(err,group)=>{
    //     console.log(group);
    // });

        // Group.update(
        //     group,
        //     {
        //         $pull:{
        //             "contacts":{
        //                 contact:contactobj.contactid
        //             }
        //         }
        //     },
        //     (err,raw)=>{
        //         if(err){
        //             resp.json({
        //                 success:false
        //             });
        //         }else{
        //             resp.json({
        //                 success:true
        //             });
        //         }
        //     }
        // );

});






//export
module.exports = router;