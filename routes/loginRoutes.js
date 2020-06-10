const bcrypt = require('bcrypt');
const AuthenticationController = require('../controllers/authenticate');
module.exports = (app) => {
    app.post('/login', AuthenticationController.signup)
}