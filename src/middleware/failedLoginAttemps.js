const userModel = require('../models/personModel');
const { compare } = require('../helpers/handleBcrypt');
const response = require('../helpers/response');
const error = require('../constansts');

const checkFailedLoginAttempts = async (req, res, next) => {
  const email = req.body.person_email;
  const foundUser = await userModel.findOne({ person_email: email });
  if (!foundUser) return response.error(req, res, error.ERROR_RESPONSES.not_found, 401);
  if (foundUser.failedLoginAttempts >= 3){
    const result = await compare(req.body.password, foundUser.password);
    if(result == false){
      return response.error(req, res, error.ERROR_RESPONSES.blocked, 401, err);
    };
  };
  next();
};

module.exports = { checkFailedLoginAttempts };
