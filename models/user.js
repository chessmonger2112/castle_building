var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  settings: Object,
  castle: String
});

userSchema.methods.sayHello = function() {
  console.log("Hi, I'm " + this.name + ' and ' + this.favorite + ' is my favorite');
};

var User = mongoose.model('User', userSchema);
module.exports = User;

