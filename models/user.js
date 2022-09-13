const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  phone: Number,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  results: [Number],
  score: Number,
  isAdmin: Boolean,
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
