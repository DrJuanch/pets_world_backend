const user = require('../models/personModel');
const { compare } = require('../helpers/handleBcrypt');
const response = require('../helpers/response');
const error = require('../constansts');

const checkFailedLoginAttempts = async (req, res, next) => {
  const email = req.body.email;
  const user = await user.findOne({ person_email: email });
  if (!user) return response.error(req, res, error.ERROR_RESPONSES.not_found, 401, err);
  if (user.failedLoginAttempts >= 3){
    const result = await compare(req.body.password, user.password);
    if(result == false){
      return response.error(req, res, error.ERROR_RESPONSES.blocked, 401, err);
    };
  };
  next();
};

module.exports = { checkFailedLoginAttempts };
