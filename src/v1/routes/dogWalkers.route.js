const express = require('express');
const router = express.Router();
const controller = require('../../controller/dogWalkersController');

router.get('/', controller.getDogWalkers);
router.post('/sendNotification', controller.sendNotification);
router.get('/notifications', controller.notifications);


module.exports = router;
