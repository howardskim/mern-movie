const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const { Schema } = mongoose;
const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: 'Please supply an email'
    },
    password:{
        type: String
    }
});

UserSchema.pre("save", function (next) {
  const user = this;



  // generate a salt
  bcrypt.genSalt(saltRounds, function (err, salt) {
    // if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
    //   if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});
mongoose.model('users', UserSchema)