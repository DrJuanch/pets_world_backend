const { compare } = require('../helpers/handleBcrypt');
const response = require('../helpers/response');
const { tokenSign } = require('../helpers/generateToken');
const personModel = require('../models/personModel');
const error = require('../constansts');

const loginController = async (req, res) => {
  try {
    const { person_email, person_password } = req.body;
    const user = await personModel.findOne({ person_email: person_email });

    if (!user) {
      return response(req, res, error.ERROR_RESPONSES.not_found, 401);
    }

    console.log('click');
    const failedLoginAttempts = user.failedLoginAttempts + 1;
    const comparing = await compare(person_password, user.person_password);

    if(comparing){
      if (user.have_sign_in == 0){
        user.have_sign_in += 1;
      }
      const haveSignIn = user.have_sign_in;
      res.header('Have-Sign-In', haveSignIn);
      const tokenSession = await tokenSign(user);
      response.success(req, res, {data: user, tokenSession}, 200);
      if (user.failedLoginAttempts > 0) {
        user.failedLoginAttempts = 0;
        await user.save();
      }
      await user.save();
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

module.exports = { loginController };
