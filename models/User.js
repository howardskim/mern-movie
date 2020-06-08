const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
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
})
mongoose.model('users', userSchema)