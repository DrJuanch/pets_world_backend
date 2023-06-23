const jwt = require('jsonwebtoken')

const tokenForgot = async (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email
    },
    process.env.JWT_SECRET_FORGOT,
    {
      expiresIn: "7m"
    }
  );
};

const verifyTokenForgot = async (token) => {
  try{
    return jwt.verify(token, process.env.JWT_SECRET_FORGOT)
  } catch (e) {
    return null
  }
}
