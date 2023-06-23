const model = require('../models/personModel')
const { existDB } = require('../constansts')

async function addPerson(person){
  const myPerson = new model(person);
  await myPerson.save();
}

function getPerson(filterPerson){
  return new Promise((resolve) => {
    let filter = {}
    if (filterPerson !== null){
      filter = {person_id: filterPerson}
    };
    const person = model.find(filter);
    resolve(person)
  })
}

async function updatePerson(id, email, phone, address, photo){
  const foundPerson = await model.findById(id);
  foundPerson.person_email = email;
  foundPerson.person_phone = phone;
  foundPerson.person_address = address;
  foundPerson.person_photo = photo;
  const updatePerson = {
    email,
    phone,
    address,
    photo
  };
  const updatedPerson = await foundPerson.save(updatePerson);
  return updatedPerson;
};

async function removePerson(id){
  if(await existDB(id, model)){
    return await model.findByIdAndDelete(id)
  }
  return false;
};

module.exports = {
  add: addPerson,
  list: getPerson,
  update: updatePerson,
  remove: removePerson
}


