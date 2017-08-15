const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userName: { type: String }
});

module.exports = mongoose.model('Users', UserSchema);
