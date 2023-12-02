const express = require('express');
const router = express.Router();
const { checkAuthForgot } = require('../../middleware/tokenForgotMiddleware');
const { recoveryController } = require('../../controller/recoveryController');
const { validateCreate } = require('../../validators/loginValidator');

router.post('/', checkAuthForgot, validateCreate, recoveryController);

module.exports = router;
