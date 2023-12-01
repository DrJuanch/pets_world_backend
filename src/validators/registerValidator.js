const { check } = require('express-validator');
const { validateResult } = require('../helpers/validatorHelper');
const { ERROR_RESPONSES } = require('../constansts');

const validateCreatePerson = [
  check('name')
    .exists()
    .not()
    .isEmpty()
    .withMessage(ERROR_RESPONSES.invalid)
    .isAlpha()
    .withMessage(ERROR_RESPONSES.just_letters),
  check('email')
    .exists()
    .not()
    .isEmpty()
    .withMessage(ERROR_RESPONSES.invalid)
    .isEmail()
    .withMessage(ERROR_RESPONSES.invalid),
  check("phone")
    .exists()
    .not()
    .isEmpty()
    .isNumeric()
    .withMessage("El campo phone debe ser un valor numérico")
    .isLength({ min: 10, max: 10 })
    .withMessage("El campo phone debe tener una longitud de 10 dígitos"),
  check('password')
    .exists()
    .not()
    .isEmpty()
    .isLength({ min: 8, max: 16 })
    .withMessage(ERROR_RESPONSES.invalid)
    .matches(/^(?=.*[A-Z])(?=.*\d).*$/)
    .withMessage(ERROR_RESPONSES.weak_password),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateCreatePerson };
