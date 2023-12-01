const express = require('express');
const router = express.Router();
const controller = require('../../controller/personController');

router.post('/', controller.postPerson);
router.get('/', controller.getPerson);
router.put('/:id', controller.putPerson);
router.delete('/:id', controller.deletePerson);


module.exports = router;
