const express = require('express');
const cors = require('cors');
const passport = require('passport');
require('./models/User');
require('./models/Favorites')
const loginRoutes = require('./routes/loginRoutes');
const signUpRoutes = require('./routes/signUpRoutes')
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const keys = require('./config/keys');
const app = express();
const cookieSession = require("cookie-session");
const session = require('express-session');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());
// app.use(session({ secret: "anything" }));
// app.use(passport.initialize());
// app.use(passport.session());
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

loginRoutes(app);
signUpRoutes(app);
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log('running on port 5000')
})