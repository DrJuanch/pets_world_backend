const mongoose = require('mongoose');
const { schema } = require('./personModel');
const Schema = mongoose.Schema;

const myPetSchema = new Schema({
  pet_owner: {
    type: Schema.Types.ObjectId,
    ref: 'Person',
    required: true
  },
  pet_name: {
    type: String
  },
  pet_age: {
    type: Number
  }
},
  {
    timestamps: true
  }
);

const petModel = mongoose.model('Pet', myPetSchema);

module.exports = petModel
