const express = require('express');
const router = express.Router();
const { validateCreate } = require('../../validators/loginValidator');
const { validateCreatePerson } = require('../../validators/registerValidator');
const { validateForgot } = require('../../validators/forgotPassword');
const { loginController } = require('../../controller/loginController');
const { registerController }  =require("../../controller/registerController");
const { forgotController } = require('../../controller/forgotController');
const { recoveryController } = require('../../controller/recoveryController');
const { checkFailedLoginAttempts } = require('../../middleware/failedLoginAttemps');
const { checkAuthForgot } = require('../../middleware/tokenForgotMiddleware');

const controller = require('../../controller/loginController');

router.post('/', checkFailedLoginAttempts, validateCreate, loginController);

router.post('/register', validateCreatePerson, registerController);

router.post('/forgot-password', validateForgot, forgotController);

router.post('/password-recovery', checkAuthForgot, validateCreate, recoveryController);

module.exports = router;
