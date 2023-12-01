const { compare } = require('../helpers/handleBcrypt');
const response = require('../helpers/response');
const { tokenSign } = require('../helpers/generateToken');
const personModel = require('../models/personModel');
const error = require('../constansts');

const loginController = async (req, res) => {
  try {
    const { person_email, person_password } = req.body;
    const user = await personModel.findOne({ person_email });
    const failedLoginAttempts = user.failedLoginAttempts + 1;
    const comparing = await compare(person_password, user.person_password);

    const tokenSession = await tokenSign(user);

    if(comparing){
      response.success(req, res, {data: user, tokenSession}, 200);
      user.failedLoginAttempts = 0;
      user.save();
      return
    } else if(!comparing){
      user.failedLoginAttempts = failedLoginAttempts;
      user.save();
      response.error(req, res, error.ERROR_RESPONSES.invalid);
    };
  } catch (e) {
    response.error(req, res, error.ERROR_RESPONSES.unexpected)
  };
};

module.exports = loginController;
