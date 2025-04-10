const mongoose = require('mongoose');
//==passport--> for authentication--> npm i passport passport-local passport-local-mongoose
const Schema = mongoose.Schema;
const  passportLocalMongoose = require('passport-local-mongoose');


const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

//==adds other fields eg username
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema)