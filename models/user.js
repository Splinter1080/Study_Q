const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    //required: true
  },
  age: {
    type: Number,
    required: true,
  },
  phone: {
    type: Number,
    //required: true
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    //required:true
  },
  isReset: {
    type: String,
    // required:true
  },
  isPro: {
    type: Boolean,
  },
  isPurchasing: {
    type: Boolean,
  },
  token: { type: String },
  security: {
    type: String,
  },
});

module.exports = mongoose.model("User", UserSchema);
