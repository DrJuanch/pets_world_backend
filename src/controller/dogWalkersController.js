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

function sendNotification(req, res) {
  const { dogWalkerId,  user_name, user_phone, message } = req.body;
  validator.sendNotification(dogWalkerId, message, user_name, user_phone)
  .then((data) => {
    response.success(req, res, {data}, 200);
  })
  .catch(err => {
    response.error(req, res, error.ERROR_RESPONSES.intern, 500, err);
  });
};

module.exports = {
  getDogWalkers,
  sendNotification,
};

