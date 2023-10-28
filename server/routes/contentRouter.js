const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');

router.get('/content', contentController.getContent);
router.post('/content/create', contentController.createContent);

module.exports = router;