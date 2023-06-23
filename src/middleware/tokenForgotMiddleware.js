const { verifyTokenForgot } = require('../helpers/forgotToken');
const error = require('../constansts')

const checkAuthForgot = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ').pop();
    const tokenData = await verifyTokenForgot(token);
    if (tokenData._id){
      next()
    } else {
      res.status(409);
      res.send({ error: error.ERROR_RESPONSES.expired_token })
    };
  } catch (e) {
    res.status(409)
    res.send({ error: error.ERROR_RESPONSES.invalid })
  };
};

module.exports = checkAuthForgot
