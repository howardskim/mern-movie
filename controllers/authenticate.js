//logic to process a request and to ultimately respond to it
const mongoose = require('mongoose');
const User = mongoose.model('users');
const Favorite = mongoose.model('favorites')
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
    res.send({
        token: createToken(req.user),
        favorites: req.user.favorites,
        id: req.user._id
    });
    next();
}

exports.getfavorites = (req, res, next) => {
    const { id } = req.query;
    User.findById(id).select('favorites').exec((err, data) => {
        let hash = {};
        for(let elem of data.favorites){
            let { id } = elem;
            hash[id] = elem;
        }
        let unique = Object.values(hash);
        if(err){
            return res.status(400).json({err})
        } else {
            res.status(200).send(unique);
        }
    })
}

exports.deletemovie = (req, res, next) => {
    const { id, user } = req.query;
    User.update(
    { _id: user },
    { $pull: { favorites: { id: id } } },
    { safe: true, multi: true },
    function (err, obj) {
        if(err){
            return res.status(500).json({msg: err})
        } else {
            return res.status(200).json({msg: 'successfully deleted', id: Number(id)})
        }
    }
    )
}

exports.addmovie = (req, res, next) => {
    const { userID } = req.body;
    const addedMovie = req.body;
    const addedFavorite = new Favorite({
        ...addedMovie
    });
    // preventing login again after saving to favorites
    // User.findById(userID , (err, doc) => {
    //     if(err){
    //         res.status(400).json({
    //             error: 'This is already in your favorites!',
    //             msg: err
    //         })
    //     } else {
    //         let { favorites } = doc;
    //         favorites.push(addedMovie);
    //         let hash = {};
    //         for(let movie of favorites){
    //             hash[movie.id] = movie;
    //         }
    //         let unique = Object.values(hash);
    //         doc.favorites = unique;
    //         console.log(doc)
    //     }
    // })
    User.update(
        { _id: userID },
        { $addToSet: { favorites: addedMovie } },
        function (err, doc) {
        if (err) {
            return res.json({ err });
        } else {
            return res.status(200).json({ data: addedFavorite });
        }}
    );
    // addedFavorite.save((err) => {
    //     if(err) {
    //         res.status(400).json({
    //             error: 'This is already in your favorites!',
    //             msg: err
    //         })
    //     } else {
    //         User.update(
    //           { _id: userID },
    //           { $addToSet: { favorites: addedMovie } },
    //           function (err, doc) {
    //             if (err) {
    //               return res.json({ err });
    //             } else {
    //               return res.status(200).json({ data: addedFavorite, doc });
    //             }
    //           }
    //         );
    //     }
    // })
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
            res
              .status(200)
              .json({ token: createToken(newUser), id: newUser._id });

        })

    })
}