const validator = require('../validators/petValidator');
const response = require('../helpers/response');
const error = require('../constansts');

function getUserPet(req, res) {
  const filterPet = req.query.pet_owner
  if (filterPet) {
    validator.getUserPet(filterPet)
      .then((petFound) => {
        response.success(req, res, petFound, 200);
      }).catch(err => {
        response.error(req, res, error.ERROR_RESPONSES.intern, 500, err);
      });
  }
  response.error(req, res, error.ERROR_RESPONSES.invalid, 404);
};

module.exports = {
  getUserPet
}

