const express = require('express');
const router = express.Router();
const controller = require('../../controller/dogWalkersController');

router.get('/', controller.getDogWalkers);

module.exports = router;
