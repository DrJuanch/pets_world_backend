const service = require('../services/personService');

async function addPerson(name, email, address, id, password, phone, photo) {
  if (!name || !email || !address || !id || !password || !phone || !photo) {
    throw new Error('INVALID DATA');
  }

  const fullPerson = {
    person_name: name,
    person_email: email,
    person_address: address,
    person_id: id,
    person_password: password,
    person_phone: phone,
    person_photo: photo
  };

  try {
    await service.add(fullPerson);
    return fullPerson;
  } catch (err) {
    throw err;
  }
}

async function getPerson(filterPerson) {
  return await service.list(filterPerson)
}

async function updatePerson(id, email, phone, address, photo){
  if(!id){
    throw new Error("INVALID ID");
  }
  try{
    const result = await service.update(id, email, phone, address, photo)
    return result;
  } catch (err){
    throw err;
  }
};

async function deletePerson(id) {
  if (!id) {
    throw new Error('INVALID DATA');
  } else {
    try {
      const data = await service.remove(id);
      if (!data) {
        throw new Error('Person was not found, check id or already deleted')
      }
      return;
    } catch (err) {
      throw err;
    }
  };
};

module.exports = {
  addPerson,
  getPerson,
  updatePerson,
  deletePerson
}
