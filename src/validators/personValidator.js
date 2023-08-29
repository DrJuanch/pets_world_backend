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

function updatePerson(id, email, address, phone, photo){
  return new Promise ((resolve, reject) => {
    if(!id){
      reject("INVALID ID");
    };
    const result = service.update(id, email, phone, address, photo);
    resolve(result);
  });
};

function deletePerson(id) {
  return new Promise((resolve, reject) => {
    if (!id) {
      throw new Error('INVALID DATA');
    } else {
      service.remove(id)
        .then((data) => {
          if (!data) {
            reject('Person was not found, check id or already deleted')
          }
          resolve()
        })
        .catch(err => {
          reject(err);
        });
    };
  });
};

module.exports = {
  addPerson,
  getPerson,
  updatePerson,
  deletePerson
}
