const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { ERROR_RESPONSES } = require('../../constansts');
const { selectRoleController } = require('../../controller/roleSelectionController');

router.post('/', [
  check('front_picture')
  .exists()
  .not()
  .isEmpty()
  .withMessage(ERROR_RESPONSES.invalid),
check('left_picture')
  .exists()
  .not()
  .isEmpty()
  .withMessage(ERROR_RESPONSES.invalid),
check("right_picture")
  .exists()
  .not()
  .isEmpty()
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
