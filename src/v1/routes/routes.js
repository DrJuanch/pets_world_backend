const routes = function (server){
  server.use('/login', require('./login.route'));
  server.use('/person', require('./person.route'));
  server.use('/register', require('./register.route'));
  server.use('/passwordRecovery', require('./passwordRecovery.route'));
  server.use('/forgotPassword', require('./forgotPassword.route'));
  server.use('/roleSelection', require('./roleSelection.route'));
};

module.exports = routes;

