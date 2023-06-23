const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const myPersonSchema = new Schema(
  {
    person_name: {
      type: String,
      required: true
    },
    failedLoginAttempts: {
      type: Number, default: 0
    },
    person_email: {
      type: String,
      required: true
    },
    person_address:{
      type: String,
      required: true
    },
    person_id:{
      type: String,
      unique : true,
      required: true
    },
    person_password:{
      type:String,
      required: true
    },
    person_phone:{
      type:Number,
      required:true
    },
    person_photo:{
      type:String,
      required:true
    }
  },

  {
    timestamps:true
  }

);

const personModel = mongoose.model('Person', myPersonSchema);

module.exports = personModel
