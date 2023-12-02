const { verifyToken } = require('../helpers/generateToken');
const error = require('../constansts')

const checkAuth = async (req, res, next) => {
  try{
    const token = req.headers.authorization.split(' ').pop()
    const tokenData = await verifyToken(token)
    if(tokenData._id){
      next()
    } else {
      res.status(409)
      res.send({error: error.ERROR_RESPONSES.check_token})
    };
  } catch (e) {
    res.status(409);
    res.send({ error: error.ERROR_RESPONSES.check_token })
  };
};

module.exports = checkAuth;
