const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  hunger: {
    type: Number,
    required: true,
    default: 50,
  },
  thirst: {
    type: Number,
    required: true,
    default: 50,
  },
  userId: {
  	type: mongoose.Types.ObjectId,
  },
  life: {
    type: Boolean,
    required: true,
    default: true,
  },
  age: {
    type: Number,
    required: true,
    default: 0,
  },
  picture: {
    type: String,
    required: true,
  },
});

const Pet = mongoose.model('pets', petSchema);
module.exports = Pet;
