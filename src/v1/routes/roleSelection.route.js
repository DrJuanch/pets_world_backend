const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { ERROR_RESPONSES } = require('../../constansts');
const { selectRoleController } = require('../../controller/roleSelectionController');

router.post('/', [
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
], selectRoleController);

module.exports = router;

/* const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { ERROR_RESPONSES } = require('../../constansts');
const { selectRoleController } = require('../../controller/roleSelectionController');

router.post('/', (req, res, next) => {
  const selectedRole = req.body.role;

  if (selectedRole === 'user') {
    return [
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
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
      }
    ];
  } else if (selectedRole === 'Paseador') {
    return [
      check('front_picture')
      .custom((value, { req }) => {
        if (!req.files || !req.files.front_picture) {
          throw new Error('Front picture is required');
        }
        const file = req.files.front_picture;
        if (!file.mimetype.includes('image')) {
          throw new Error('Front picture must be an image file');
        }
        return true;
      }),
      check('left_picture')
        .custom((value, { req }) => {
          if (!req.files || !req.files.left_picture) {
            throw new Error('Left picture is required');
          }
          const file = req.files.left_picture;
          if (!file.mimetype.includes('image')) {
            throw new Error('Left picture must be an image file');
          }
          return true;
        }),
      check('right_picture')
        .custom((value, { req }) => {
          if (!req.files || !req.files.right_picture) {
            throw new Error('Right picture is required');
          }
          const file = req.files.right_picture;
          if (!file.mimetype.includes('image')) {
            throw new Error('Right picture must be an image file');
          }
          return true;
        }),
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
      }
    ];
  } else if (selectedRole === 'Instructor') {
    check('front_picture')
      .custom((value, { req }) => {
        if (!req.files || !req.files.front_picture) {
          throw new Error('Front picture is required');
        }
        const file = req.files.front_picture;
        if (!file.mimetype.includes('image')) {
          throw new Error('Front picture must be an image file');
        }
        return true;
      }),
      check('left_picture')
        .custom((value, { req }) => {
          if (!req.files || !req.files.left_picture) {
            throw new Error('Left picture is required');
          }
          const file = req.files.left_picture;
          if (!file.mimetype.includes('image')) {
            throw new Error('Left picture must be an image file');
          }
          return true;
        }),
      check('right_picture')
        .custom((value, { req }) => {
          if (!req.files || !req.files.right_picture) {
            throw new Error('Right picture is required');
          }
          const file = req.files.right_picture;
          if (!file.mimetype.includes('image')) {
            throw new Error('Right picture must be an image file');
          }
          return true;
        }),
      check('instructor_certificate')
        .custom((value, { req }) => {
          if (!req.files || req.files.instructor_certificate) {
            throw new Error('Instructor certificate picture is required');
          }
          const file = req.files.right_picture;
          if (!file.mimetype.includes('image')) {
            throw new Error('Instructor certificate picture must be an image file');
          }
          return true;
        }),
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
      }
  } else if (selectedRole === 'Veterinario') {
    check('front_picture')
      .custom((value, { req }) => {
        if (!req.files || !req.files.front_picture) {
          throw new Error('Front picture is required');
        }
        const file = req.files.front_picture;
        if (!file.mimetype.includes('image')) {
          throw new Error('Front picture must be an image file');
        }
        return true;
      }),
      check('left_picture')
        .custom((value, { req }) => {
          if (!req.files || !req.files.left_picture) {
            throw new Error('Left picture is required');
          }
          const file = req.files.left_picture;
          if (!file.mimetype.includes('image')) {
            throw new Error('Left picture must be an image file');
          }
          return true;
        }),
      check('right_picture')
        .custom((value, { req }) => {
          if (!req.files || !req.files.right_picture) {
            throw new Error('Right picture is required');
          }
          const file = req.files.right_picture;
          if (!file.mimetype.includes('image')) {
            throw new Error('Right picture must be an image file');
          }
          return true;
        }),
      check('veterinarian_certificate')
        .custom((value, { req }) => {
          if (!req.files || req.files.instructor_certificate) {
            throw new Error('Veterinarian certificate picture is required');
          }
          const file = req.files.right_picture;
          if (!file.mimetype.includes('image')) {
            throw new Error('Veterinarian certificate picture must be an image file');
          }
          return true;
        }),
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
      }
  }
  return res.status(400).json({ error: 'Rol inválido' });
}, selectRoleController);

module.exports = router;
 */
