const validator = require('../validators/personValidator')
const response = require('../helpers/response')
const error = require('../constansts')

function getPerson(req, res){
  const filterPerson = req.query.person_id || null
  validator.getPerson(filterPerson)
    .then((personFound)=>{
        response.success(req, res, personFound, 200);
    })
    .catch(err => {
      response.error(req, res, error.ERROR_RESPONSES.unexpected, 500, err)
    });
};

function postPerson(req, res){
  const {person_name, person_email, person_address, person_id, person_password, person_phone, person_photo} = req.body
  validator.addPerson(person_name, person_email, person_address,person_id, person_password, person_phone, person_photo)
    .then((fullPerson) => {
      response.success(req, res, fullPerson, 201)
    })
    .catch(err => {
      response.error(req, res, error.ERROR_RESPONSES.invalid, 400, err);
    });
};

function putPerson(req, res){
  const {email, address, phone, photo} = req.body
  validator.updatePerson(req.params.id, email, address, phone, photo)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(err => {
      response.error(req,res, error.ERROR_RESPONSES.intern, 500, err)
    });
};

function deletePerson(req, res){
  let id = req.params.id
  validator.deletePerson(id)
    .then(() => {
      response.success(req, res, `Person ${id} deleted`, 200);
    })
    .catch(err => {
      response.error(req, res, error.ERROR_RESPONSES.check, 404, err);
    });
};

module.exports = {
  getPerson,
  putPerson,
  deletePerson,
  postPerson
}
