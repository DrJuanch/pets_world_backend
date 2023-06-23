const user = require('./person')

const routes = function (server) {
  server.use('/user', user);
}

module.exports = routes;
