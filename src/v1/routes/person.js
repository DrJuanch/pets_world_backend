const express = require('express');
const router = express.Router();
const controller = require('../../controller/personController');

router.post('/person', controller.postPerson);
router.get('/person', controller.getPerson);
router.put('/:id', controller.putPerson);
router.delete('/:id', controller.deletePerson);


module.exports = router;
