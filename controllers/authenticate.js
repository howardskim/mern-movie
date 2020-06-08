//logic to process a request and to ultimately respond to it
const mongoose = require('mongoose');
const User = mongoose.model('users');
exports.signup = (req, res, next) => {
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
            res.status(200).json({success: true})
        })

    })
    // res.send({
    //     success: true
    // })
}