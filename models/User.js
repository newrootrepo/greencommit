const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true, 
    lowercase: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],  
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true,  
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'], 
  },
  isVerified: {
    type: Boolean,
    default: false,  
  },
  isBlocked: {
    type: Boolean,
    default: false, 
  },
}, { 
  timestamps: true 
});

const User = mongoose.model('User', userSchema);

module.exports = User;
