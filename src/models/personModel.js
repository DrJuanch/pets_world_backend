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
      required: true,
      unique: true
    },
    person_address: {
      type: String,
    },
    person_id: {
      type: String,
      unique: true,
      required: true
    },
    person_password: {
      type: String,
      required: true
    },
    person_phone: {
      type: Number,
    },
    person_photo: {
      type: String,
    },
    date_of_birth: {
      type: Date,
      required: true
    },
    have_sign_in: {
      type: Number, default: 0
    },
    confirmation_token: {
      type: String
    },
    front_photo: {
      data: Buffer,
      contentType: String
    },
    right_photo: {
      data: Buffer,
      contentType: String
    },
    left_photo: {
      data: Buffer,
      contentType: String
    },
    is_veterinarian: {
      studies_certificate: {
        data: Buffer,
        contentType: String
      }
    },
    is_instructor: {
      certification: {
        data: Buffer,
        contentType: String
      }
    },
    role: {
      type: String,
      default: 'user'
    }
  },

  {
    timestamps: true
  }

);

const personModel = mongoose.model('Person', myPersonSchema);

module.exports = personModel
