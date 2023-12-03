const jwt = require('jsonwebtoken')
const crypto = require('crypto');

const tokenSign = async (user) => {
  return jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h"
    }
  );
};

const verifyToken = async (token) => {
  try{
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (e) {
    return null
  };
};

const decodeSign = (token) => {
  return jwt.decode(token, null)
};

const generateUniqueToken = () => {
  return crypto.randomBytes(20).toString('hex');
};

module.exports = {
  tokenSign,
  decodeSign,
  verifyToken,
  generateUniqueToken
}
