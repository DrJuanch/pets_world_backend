const personModel = require('../models/personModel');
const error = require('../constansts');
const { response } = require('express');

const roleController = async (req, res) => {
  try{
    const { role, person_email } = req.body.role;
    const user = await personModel.findOne({person_email: person_email})
    if(!user){
      return response(req, res, error.ERROR_RESPONSES.not_found, 404);
    }

    if (role === "user") {
      pass
    }
  } catch {
    pass
  }
}
