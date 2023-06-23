const model = require('../models/trainerModel')
const exist = require('../constansts')

function addTrainer(trainer){
  const myTrainer = new model(trainer)
  myTrainer.save();
};

function getTrainer(filterTrainer){
  let filter = {};
  return new Promise ((resolve, reject) => {
    if (filterTrainer !== null){
      filter = {_id: filterTrainer}
    };
    model.find(filter)
      .populate('person', {person_name:true, person_email:true, person_address:true})
      .exec((error, populated) => {
        if (error){
          reject(error);
          return false;
        };
        resolve(populated);
      });
  });
};

async function removeTrainer(id){
  if (await exist(id, model)){
    return await model.findByIdAndDelete(id);
  }
  return false
}

module.exports = {
  add: addTrainer,
  list: getTrainer,
  remove: removeTrainer
}


