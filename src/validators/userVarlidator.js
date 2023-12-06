const { check, validationResult } = require('express-validator');
const { ERROR_RESPONSES } = require('../constansts');

const validateUser = [
  check('pet_name')
      .exists()
      .not()
      .isEmpty()
      .withMessage(ERROR_RESPONSES.invalid),
    check('pet_age')
      .exists()
      .not()
      .isEmpty()
      .withMessage(ERROR_RESPONSES.invalid),
    check('email')
      .exists()
      .not()
      .isEmpty()
      .withMessage(ERROR_RESPONSES.invalid)
      .isEmail()
      .withMessage(ERROR_RESPONSES.invalid),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
];

module.exports = { validateUser };
