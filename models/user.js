const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  }
});

const User = mongoose.model('User', UserSchema, 'users');
module.exports = User;
