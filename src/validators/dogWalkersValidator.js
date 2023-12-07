const service = require('../services/dogWalkersService');

async function getDogWalkers(filterDogWalker){
  return await service.getDogWalkers(filterDogWalker);
}

module.exports = {
  getDogWalkers
};
