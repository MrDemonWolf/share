const mongoose = require('mongoose');

const { Schema } = mongoose;

const TokenSchema = new Schema({
  tokenHash: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  displayName: String,
  expireAt: {
    type: Date,
    required: true,
    expires: -1
  }
});

module.exports = mongoose.model('Token', TokenSchema);