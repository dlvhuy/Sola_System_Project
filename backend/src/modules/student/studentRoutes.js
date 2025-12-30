const express = require('express');
const router = express.Router();
const studentController = require('./studentController');

router.get('/', studentController.findAll);
router.post('/', studentController.create);
router.get('/:id', studentController.getStudentWithReports);

module.exports = router;
