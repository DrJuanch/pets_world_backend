const express = require('express');
const router = express.Router();
const { validateCreate } = require('../../validators/loginValidator');
const { loginController } = require('../../controller/loginController');
const { checkFailedLoginAttempts } = require('../../middleware/failedLoginAttemps');

router.post('/', checkFailedLoginAttempts, validateCreate, loginController);

module.exports = router;
