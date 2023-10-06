const { check } = require('express-validator');
const { validateResult } = require('../helpers/validatorHelper');
const { ERROR_RESPONSES } = require('../constansts');

const validateCreatePerson = [
  check('person_name')
    .exists()
    .not()
    .isEmpty()
    .withMessage(ERROR_RESPONSES.invalid)
    .isAlpha()
    .withMessage(ERROR_RESPONSES.just_letters),
  check('person_email')
    .exists()
    .not()
    .isEmpty()
    .withMessage(ERROR_RESPONSES.invalid)
    .isEmail()
    .withMessage(ERROR_RESPONSES.invalid),
  check('person_password')
    .exists()
    .not()
    .isEmpty()
    .isLength({ min: 8, max:16 })
    .withMessage(ERROR_RESPONSES.invalid)
    .matches(/^(?=.*[A-Z])(?=.*\d).*$/)
    .withMessage(ERROR_RESPONSES.weak_password),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateCreatePerson };
