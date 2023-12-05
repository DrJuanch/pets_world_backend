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
      const { rightPhoto, leftPhoto, frontPhoto } = req.body;

      if (rightPhoto || leftPhoto || frontPhoto) {
        const updateFields = {};

        if (rightPhoto) {
          updateFields.right_photo = {
            data: Buffer.from(rightPhoto.data, 'base64'),
            contentType: rightPhoto.contentType
          };
        }
        if (leftPhoto) {
          updateFields.left_photo = {
            data: Buffer.from(leftPhoto.data, 'base64'),
            contentType: leftPhoto.contentType
          };
        }
        if (frontPhoto) {
          updateFields.front_photo = {
            data: Buffer.from(frontPhoto.data, 'base64'),
            contentType: frontPhoto.contentType
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

