const personModel = require('../models/personModel');
const petModel = require('../models/petModel');
const response = require('../helpers/response');
const { ERROR_RESPONSES } = require('../constansts');

const selectRoleController = async (req, res) => {
  const { role, email } = req.body;
  const user = await personModel.findOne({ person_email: email })
  if (!user) {
    throw new Error("User not found");
  }
  if (role === 'user') {
    try {
      const { pet_name, pet_age } = req.body;
      const registerPet = await petModel.create({
        pet_owner: user._id,
        pet_name: pet_name,
        pet_age: pet_age
      })
      await personModel.updateOne({ person_email: email }, { role: role });
      user.save();
      response.success(req, res, { data: registerPet }, 200)
    } catch (err) {
      response.error(req, res, ERROR_RESPONSES.unexpected, 500, err);
    }
  } else if (role === 'paseador') {
    try {
      const { right_photo, left_photo, front_photo } = req.body;

      if (right_photo && left_photo && front_photo) {
        const updateFields = {};

        if (right_photo) {
          updateFields.right_photo = {
            data: Buffer.from(right_photo.data, 'base64'),
            contentType: right_photo.contentType
          };
        }
        if (left_photo) {
          updateFields.left_photo = {
            data: Buffer.from(left_photo.data, 'base64'),
            contentType: left_photo.contentType
          };
        }
        if (front_photo) {
          updateFields.front_photo = {
            data: Buffer.from(front_photo.data, 'base64'),
            contentType: front_photo.contentType
          };
        }
        await personModel.updateOne({ person_email: email }, { role: role });
        await personModel.updateOne({ person_email: email }, { $set: updateFields });
        user.save();
      }
      response.success(req, res, 'Fotos actualizadas exitosamente');
    } catch (err) {
      response.error(req, res, ERROR_RESPONSES.unexpected, 500, err);
    }
  }
};

module.exports = {
  selectRoleController,
};

