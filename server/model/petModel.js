const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
  petType: {
    type: String,
    enum: ['cat', 'cat2', 'dog', 'dog2', 'hedgehog','rabbit', 'snake', 'mole'],
    required: true
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
