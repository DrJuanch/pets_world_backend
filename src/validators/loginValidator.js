const { check } = require('express-validator');
const { validateResult } = require('../helpers/validatorHelper');
const { ERROR_RESPONSES } = require('../constansts');


const validateCreate = [
  check("person_email")
    .exists()
    .not()
    .isEmpty()
    .withMessage(ERROR_RESPONSES.not_found),
  check("person_password")
    .exists()
    .not()
    .isEmpty()
    .isLength({ min:8, max:16 })
    .withMessage(ERROR_RESPONSES.invalid)
    .matches(/^(?=.*[A-Z])(?=.*\d).*$/)
    .withMessage(ERROR_RESPONSES.weak_password),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateCreate };
