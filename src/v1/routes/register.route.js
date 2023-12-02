const express = require('express');
const router = express.Router();
const { validateCreatePerson } = require('../../validators/registerValidator');
const { registerController }  =require("../../controller/registerController");

router.post('/', validateCreatePerson, registerController);

module.exports=router;
