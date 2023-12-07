const service = require('../services/petService');

async function getUserPet(filerPet){
  return await service.getUserPet(filterPet);
}

module.exports = {
  getUserPet
}
