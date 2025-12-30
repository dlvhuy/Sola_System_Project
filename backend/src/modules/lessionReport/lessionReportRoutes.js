const express = require('express');
const router = express.Router();
const lessionReportController = require('./lessionReportController');

router.post('/', lessionReportController.create);
router.get('/:id', lessionReportController.getLessionReport);

module.exports = router;
