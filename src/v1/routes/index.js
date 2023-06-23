const user = require('./person.route')

const routes = function (server) {
  server.use('/user', user);
}

module.exports = routes;
