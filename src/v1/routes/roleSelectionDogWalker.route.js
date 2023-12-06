const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { ERROR_RESPONSES } = require('../../constansts');
const { selectRoleController } = require('../../controller/roleSelectionController');
const fileUpload = require('express-fileupload');


router.post('/',
  fileUpload({
    useTempFiles: true,
    tempFileDir: './src/uploads'
  }), [
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
  },
], selectRoleController);

module.exports = router;
