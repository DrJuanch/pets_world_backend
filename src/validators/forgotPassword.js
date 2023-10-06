const { check } = require('express-validator');
const { validateResult } = require('../helpers/validatorHelper');
const { ERROR_RESPONSES } = require('../constansts');
const { error } = require('../helpers/response');

const validateForgot = [
  check('email')
    .exists()
    .not()
    .isEmpty()
    .withMessage(ERROR_RESPONSES.invalid)
    .isEmail()
    .withMessage(ERROR_RESPONSES.invalid),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
module.exports = { validateForgot };
