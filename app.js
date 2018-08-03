
//------------------------------------- require -------------------------
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const fs = require('fs');
const cron = require('node-cron');

const Drip = require('./models/drip');

var csv = require('fast-csv');
const Moment = require('moment');
// var momentrrange =  require('moment-range');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);
var soap = require('soap');

//-----------------------------------------------------------------------

//---------------------------- mongoose ---------------------------------
//mongodb connection
mongoose.connect(config.database);

//check if connected
mongoose.connection.on('connected',()=>{
    console.log("Connected to DB " + config.database);
});

//check if db error
mongoose.connection.on('error',(err)=>{
    console.log("DB error " + err);
});
//-----------------------------------------------------------------------


//start express 
const app = express();

var upload = require('express-fileupload');

app.use(upload());

//the router file for users
const users = require('./routes/users');

//the router file for masks
const masks = require('./routes/masks');

//the router file for bundles
const bundles = require('./routes/bundles');

//the router file for bundles
const issues = require('./routes/issues');

//the router file for bundles
const contacts = require('./routes/contacts');

const notifications = require('./routes/notifications');


const messaging = require('./routes/messaging');
const hybrid = require('./routes/hybrid');

const haji = require('./routes/haji');

//port
const port = 3000;

//middlewares
//any domain can access our server 
app.use(cors({credentials: true, origin: 'http://localhost:4200'}));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
  });

//static folder
app.use(express.static(path.join(__dirname,'public')));

//get form data incoming request
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//user routes file
app.use('/users', users); 

//user routes file
app.use('/contacts', contacts); 

// masks routes file
app.use('/masks', masks); 

// masks routes file
app.use('/bundles', bundles); 

// masks routes file
app.use('/issue', issues); 

// masks routes file
app.use('/notifications', notifications); 

app.use('/messaging', messaging); 

app.use('/hybrid', hybrid); 

app.use('/haji', haji); 


//index route
app.get('/',(req,res) => {
 res.send("Invalid Endpoint");
})


//create server
app.listen(port,()=>{
    console.log("Server started on port "+port);
})
