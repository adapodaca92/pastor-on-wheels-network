const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

router.post('/upload', imageController);
router.put('/update/:id', imageController);

module.exports = router;