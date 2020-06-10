//logic to process a request and to ultimately respond to it
const mongoose = require('mongoose');
const User = mongoose.model('users');
const jwt = require('jwt-simple');
const keys = require('../config/keys');


function createToken(user){
    const timestamp = new Date().getTime();
    return jwt.encode({
        sub: user.id,
        iat: timestamp
    }, keys.secret)
}

//Intercepter/MiddleWare

exports.signin = (req, res, next) => {
    //user already had their email and password authenticated
    //just need to give them a token
    res.send({token: createToken(req.user)})
}


exports.signup =  (req, res, next) => {
    //see if user with given email exists, 
    //if it does exist, return an error,
    //if it doesnt exist, create one and save user record and respond to the request
    //req.body
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(422).send({error: 'Provide email and password please'})
    }
    User.findOne({
        email 
    }, (error, user) => {
        if(error){
            return next(error)
        }
        if(user){
            return res.status(422).send({error: 'email already in use'})
        }
        const newUser = new User({
            email,
            password
        });
        newUser.save((err) => {
            if(err){
                return next(err)
            }
            // res.status(200).json({success: true})
            res.status(200).json({ token: createToken(newUser) });

        })

    })
    // res.send({
    //     success: true
    // })
}