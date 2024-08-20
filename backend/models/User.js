const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  establishment: {
    name: String,
    logo: String,
    floors: Number,
    rooms: Number,
  },
  team: [
    {
      firstName: String,
      lastName: String,
      role: String,
      accessLevel: Number
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
