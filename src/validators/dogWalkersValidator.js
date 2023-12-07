const service = require('../services/dogWalkersService');
const error = require('../constansts');


async function getDogWalkers(filterDogWalker){
  return await service.getDogWalkers(filterDogWalker);
}

function sendNotification(id, message, user_name, user_phone){
  return new Promise ((resolve, reject) => {
    if(!id){
      reject(error.ERROR_RESPONSES.invalid);
    }
    const result = service.sendNotification(id, message, user_name, user_phone);
    resolve(result);
  });
};

module.exports = {
  getDogWalkers,
  sendNotification
};
