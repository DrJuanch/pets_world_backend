const routes = function (server){
  server.use('/login', require('./login.route'));
  server.use('/person', require('./person.route'));
  server.use('/register', require('./register.route'));
  server.use('/passwordRecovery', require('./passwordRecovery.route'));
  server.use('/forgotPassword', require('./forgotPassword.route'));
  server.use('/roleSelectionUser', require('./roleSelectionUser.route'));
  server.use('/roleSelectionDogWalker', require('./roleSelectionDogWalker.route'))
  server.use('/dogWalkers', require('./dogWalkers.route'));
  server.use('/userPets', require('./pets.route'));
};

module.exports = routes;

