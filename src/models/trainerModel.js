const mongoose = require('mongoose')
const schema = mongoose.Schema;

const myTrainerSchema = new schema(
  {
    person: {
      type: schema.ObjectId,
      ref:'Person',
      required: true
    },

    trainer_certification: {
      type: String,
      required: true
    },
  },

  {
      timestamps: true
  }

);

const trainerModel = mongoose.model('trainer', myTrainerSchema);

module.exports=trainerModel;
