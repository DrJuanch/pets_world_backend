const personModel = require('../models/personModel');
const petModel = require('../models/petModel');
const response = require('../helpers/response');
const { ERROR_RESPONSES } = require('../constansts');

const selectRoleController = async (req, res) => {
  try {
    console.log('click');
    const { role, pet_name, pet_age, email } = req.body;
    console.log(role);
    console.log(email);
    console.log(pet_age);
    console.log(pet_name);
    if (!role || !email) {
      throw new Error("Please provide a valid role");
    }

    if (role === 'user') {
      const user = await personModel.findOne({ person_email: email })
      const registerPet = await petModel.create({
        pet_owner: user._id,
        pet_name: pet_name,
        pet_age: pet_age
      })
      await personModel.updateOne({ person_email: email }, { role: role });
      user.save();
      response.success(req, res, {data: registerPet}, 200)

    }
    response.success(req, res, { role: selectedRole }, 200);
  } catch (err) {
    response.error(req, res, ERROR_RESPONSES.unexpected, 500, err);
  }
};

module.exports = {
  selectRoleController,
};

