const express = require('express');
const router = express.Router();
const controller = require('../../controller/petController');

router.get('/', controller.getUserPet);

module.exports = router;
