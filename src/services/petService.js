const model = require('../models/petModel');

function getUserPet(filerPet) {
  return new Promise((resolve, reject) => {
    let filter = {}
    if (filerPet) {
      filter = { pet_owner: filerPet };
    };
    model.find(filter)
      .then(userPet => {
        resolve(userPet);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports = {
  getUserPet
}
