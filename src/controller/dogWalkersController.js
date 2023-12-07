const validator = require('../validators/dogWalkersValidator');
const response = require('../helpers/response');
const error = require('../constansts');

function getDogWalkers(req, res){
  const filterDogWalker = req.query.person_id || null;
  validator.getDogWalkers(filterDogWalker)
  .then((personFound) => {
    response.success(req, res, personFound, 200);
  })
  .catch(err => {
    response.error(req, res, error.ERROR_RESPONSES.unexpected, 500, err);
  });
};

module.exports = {
  getDogWalkers
};

