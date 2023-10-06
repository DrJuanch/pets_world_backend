const personModel = require('../models/personModel');
const { encrypt } = require('../helpers/handleBcrypt');
const response = require('../helpers/response');

const recoveryController = async (req, res) => {
  try  {
    const { person_email, person_password } = req.body;
    const passwordHash = await encrypt(person_password);
    const person = await personModel.findOne({person_email});

    if(!person) {
      return res.status(404).json({error: 'User does not exist'});
    } else {
      person.person_password = passwordHash;
      const resUpdate = await personModel.findOneAndUpdate(
        {person_email: person_email},
        person,
        { new: true }
      );
      res.status(200).json(resUpdate);
    }
  } catch (e) {
    response.error(req, res, 'Something happened', 500);
  }
};

module.exports = { recoveryController };

