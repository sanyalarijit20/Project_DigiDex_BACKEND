const mongoose = require('mongoose');


const BadgeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  gym: {
    type: String,
    required: true,
    trim: true,
  },
  collectedAt: {
    type: Date,
    default: Date.now,
  },
});


const FolderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  pokemons: [
    {
      type: String,
      trim: true,
    },
  ],
});


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  
  folders: [FolderSchema],
  badges: [BadgeSchema],
});

module.exports = mongoose.model('User', UserSchema);