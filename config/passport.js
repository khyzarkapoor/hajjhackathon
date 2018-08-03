
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');

module.exports = function(passport){
    let ops = {};
    ops.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    //ops.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('Bearer');

    //ops.jwtFromRequest = ExtractJwt.fromAuthHeader();
    ops.secretOrKey = config.secret;
    //console.log(ops);
    passport.use(new JwtStrategy(ops,(jwt_payload,done)=>{
        console.log(jwt_payload);

        User.getUserById(jwt_payload._id,(err,user)=>{
            if(err){
                return done(err,false);
            }

            if(user){
                return done(null,user);
            }else{
                return done(null,false);
            }
        });
    }));

}