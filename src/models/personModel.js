const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    user_name: {
      type:String
    },
    user_phone:{
      type: Number
    },
    message: {
      type:String,
      require: true
    }
  }
)

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
      public_id: String,
      secure_url: String
    },
    right_photo: {
      public_id: String,
      secure_url: String
    },
    left_photo: {
      public_id: String,
      secure_url: String
    },
    is_veterinarian: {
      studies_certificate: {
        public_id: String,
        secure_url: String
      }
    },
    is_instructor: {
      certification: {
        public_id: String,
        secure_url: String
      }
    },
    role: {
      type: String,
      default: 'user'
    },
    notification: [
      notificationSchema
    ],
    calification:{
      type:Number,
      default:3.5
    }
  },

  {
    timestamps: true
  }

);

const personModel = mongoose.model('Person', myPersonSchema);

module.exports = personModel
