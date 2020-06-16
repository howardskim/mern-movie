const bcrypt = require('bcrypt');
const AuthenticationController = require('../controllers/authenticate');
const passportService = require("../services/passport");
const passport = require("passport");
const requireLogin = require('../middlewares/requireLogin');
//Intercepter/MiddleWare

const requireAuth = passport.authenticate("jwt", {
  session: false,
});
const requireSign = passport.authenticate("local", {
    session: false
})

module.exports = (app) => {
    app.get('/', requireAuth, (req, res) => {
        res.json({success: 'authorized'})
    })
    app.post('/signup', AuthenticationController.signup);
    app.post('/signin', requireSign, AuthenticationController.signin)
    app.post("/addMovie",  AuthenticationController.addMovie);
}