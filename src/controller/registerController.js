const { encrypt } = require('../helpers/handleBcrypt');
const response = require('../helpers/response');
const { tokenSign } = require('../helpers/generateToken');
const personModel = require('../models/personModel');
const error = require('../constansts');

const registerController = async (req, res) => {
  try {
    const {name, email, phone, password} = req.body;
    const passwordHash =  await encrypt(password);
    const registerUser = await personModel.create({
      person_name : name,
      person_email : email,
      person_password: passwordHash,
      person_phone: phone,
    })
    response.success(req,res, {data: registerUser}, 200);
  } catch (e) {
    response.error(req, res, error.ERROR_RESPONSES.unexpected, 500, err)
  };
};

module.exports = { registerController };
