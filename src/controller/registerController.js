const { encrypt } = require('../helpers/handleBcrypt');
const response = require('../helpers/response');
const personModel = require('../models/personModel');
const error = require('../constansts');
const { generateUniqueToken } = require('../helpers/generateToken');
const { sendConfirmationEmail } = require('../helpers/confirmationEmail');

const registerController = async (req, res) => {
  try {
    const {name, dateOfBirth, email, phone, password} = req.body;
    const passwordHash =  await encrypt(password);
    const confirmationToken = generateUniqueToken();

    const registerUser = await personModel.create({
      person_name : name,
      person_email : email,
      person_password: passwordHash,
      person_phone: phone,
      date_of_birth: dateOfBirth,
      confirmation_token: confirmationToken
    })

    await sendConfirmationEmail(email, confirmationToken);

    response.success(req,res, {data: registerUser}, 200);
  } catch (err) {
    response.error(req, res, error.ERROR_RESPONSES.unexpected, 500, err)
  };
};

module.exports = { registerController };
