const personModel = require('../models/personModel');
const petModel = require('../models/petModel');
const response = require('../helpers/response');
const { ERROR_RESPONSES } = require('../constansts');
const { uploadImage } = require('../helpers/cloudinary');

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
      if (req.files?.front_picture && req.files?.left_picture && req.files?.right_picture) {
        const frontPhoto = await uploadImage(req.files.front_picture.tempFilePath);
        const leftPhoto = await uploadImage(req.files.left_picture.tempFilePath);
        const rightPhoto = await uploadImage(req.files.right_picture.tempFilePath);
        user.front_photo = {
          public_id: frontPhoto.public_id,
          secure_url: frontPhoto.secure_url
        }
        user.right_photo = {
          public_id: rightPhoto.public_id,
          secure_url: rightPhoto.secure_url
        }
        user.left_photo = {
          public_id: leftPhoto.public_id,
          secure_url: leftPhoto.secure_url
        }
        user.save()
        response.success(req, res,  'You have uploaded your images', 200);
      }
    } catch (err) {
      response.error(req, res, ERROR_RESPONSES.unexpected, 500, err);
    }
  }
};

module.exports = {
  selectRoleController,
};

