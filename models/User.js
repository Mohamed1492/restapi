const mongoose =require('mongoose')

const Schema = mongoose.Schema;
let userSchema=new Schema({
fullName: String,
password: String,
email: String,
phone: String
});

module.exports = mongoose.model("User", userSchema)

