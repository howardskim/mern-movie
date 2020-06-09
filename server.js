const express = require('express');
const passport = require('passport');
require('./models/User');
const loginRoutes = require('./routes/loginRoutes');
const signUpRoutes = require('./routes/signUpRoutes')
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const keys = require('./config/keys');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
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