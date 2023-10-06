const { encrypt } = require('../helpers/handleBcrypt');
const response = require('../helpers/response');
const { tokenSign } = require('../helpers/generateToken');
const personModel = require('../models/personModel');
const { response } = require('express');
const error = require('../constansts');

const registerController = async (req, res) => {
  try {
    const {name, email, address, id, password, phone, photo} = req.body;
    const passwordHash =  await encrypt(password);
    const registerUser = await personModel.create({
      person_name : name,
      person_email : email,
      person_address : address,
      person_id : id,
      person_password: passwordHash,
      person_phone: phone,
      person_photo: photo
    })
    response.success(req,res, {data: registerUser}, 200);
  } catch (e) {
    response.error(req, res, error.ERROR_RESPONSES.unexpected, 500, err)
  };
};

module.exports = { registerController };
