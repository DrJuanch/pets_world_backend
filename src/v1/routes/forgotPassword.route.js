const express = require('express');
const router = express.Router();
const { validateForgot } = require('../../validators/forgotPassword');
const { forgotController } = require('../../controller/forgotController');

router.post('/', validateForgot, forgotController);

module.exports = router;
