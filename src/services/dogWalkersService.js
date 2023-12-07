const model = require('../models/personModel');

function getDogWalkers(filterDogWalker) {
  return new Promise((resolve, reject) => {
    let filter = { role: 'paseador' };
    if (filterDogWalker) {
      filter = { person_id: filterDogWalker, role: 'paseador' };
    };
    model.find(filter)
      .then(dogWalkers => {
        resolve(dogWalkers);
      })
      .catch(error => {
        reject(error);
      });
  });
};

module.exports = {
  getDogWalkers
};
