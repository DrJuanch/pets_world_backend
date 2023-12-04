const express = require('express');
const router = express.Router();
const { validateRole } = require('../../validators/roleSelectionValidator');
const { roleController } = require('../../controller/roleSelectionController');

router.post('/', validateRole, roleController);

module.exports=router;
