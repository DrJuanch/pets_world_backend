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
      const { front_picture, right_picture, left_picture } = req.files;

      if (front_picture && right_picture && left_picture) {
        const updateFields = {};

        updateFields.right_photo = {
          data: Buffer.from(right_picture[0].buffer), // Accede al buffer del archivo
          contentType: right_picture[0].mimetype // Obtiene el tipo de contenido del archivo
        };
        updateFields.left_photo = {
          data: Buffer.from(left_picture[0].buffer),
          contentType: left_picture[0].mimetype
        };
        updateFields.front_photo = {
          data: Buffer.from(front_picture[0].buffer),
          contentType: front_picture[0].mimetype
        };

        await personModel.updateOne({ person_email: email }, { role: role, ...updateFields });
        user.save();

        response.success(req, res, 'Fotos actualizadas exitosamente');
      } else {
        response.error(req, res, ERROR_RESPONSES.invalid, 400);
      }
    } catch (err) {
      response.error(req, res, ERROR_RESPONSES.unexpected, 500, err);
    }
  }
};

module.exports = {
  selectRoleController,
};

