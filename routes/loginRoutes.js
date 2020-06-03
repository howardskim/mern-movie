const bcrypt = require('bcrypt');

module.exports = (app) => {
    app.get('/login', (req, res) => {
        res.send('hello?')
    })
}