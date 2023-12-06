const express = require('express');
const router = express.Router();
const multer = require('multer');
const { check, validationResult } = require('express-validator');
const { ERROR_RESPONSES } = require('../../constansts');
const { selectRoleController } = require('../../controller/roleSelectionController');

router.post('/', upload.fields([
  {name: 'front_picture', maxCount: 1},
  {name: 'right_picture', maxCount:1},
  { name: 'left_picture', maxCount: 1 }
]),[
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
