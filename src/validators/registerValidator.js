const { check, validationResult } = require('express-validator');
const { ERROR_RESPONSES } = require('../constansts');

const validateCreatePerson = [
  check('name')
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
  check('dateOfBirth')
    .exists()
    .isISO8601()
    .withMessage('El campo date_of_birth debe ser una fecha válida en formato YYYY-MM-DD'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateCreatePerson };
