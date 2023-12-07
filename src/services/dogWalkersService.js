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

async function sendNotification(dogWalkerId, message, user_name, user_phone) {
  const foundDogWalker = await model.findById(dogWalkerId);
  const newNotification = {
    message,
    user_name,
    user_phone
  };
  foundDogWalker.notification.push(newNotification);
  const updatedDogWalker = await foundDogWalker.save();
  return updatedDogWalker;
}


module.exports = {
  getDogWalkers,
  sendNotification
};
