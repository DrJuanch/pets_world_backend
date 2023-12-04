const personModel = require('../models/personModel');
const petModel = require('../models/petModel');
const response = require('../helpers/response');

const selectRoleController = async (req, res) => {
  try {
    const { selectedRole, email } = req.body;
    if (!selectedRole || !Object.values(error).includes(selectedRole)) throw new Error("Please provide a valid role");

    if(selectedRole === 'user'){
      const user = await personModel.findOne({ person_email: email })
      const { pet_name, pet_age } = req.body;
      const registerPet = await petModel.create({
        pet_owner: user._id,
        pet_name: pet_name,
        pet_age: pet_age
      })
      await personModel.updateOne({ person_email: email }, { role: selectedRole });
      response.success(req, res, 'Mascota registrada con éxito' + {data: registerPet}, 200)

    }
    response.success(req, res, { role: selectedRole }, 200);
  } catch (err) {
    response.error(req, res, ERROR_RESPONSES.unexpected, 500, err);
  }
};

module.exports = {
  selectRoleController,
};

