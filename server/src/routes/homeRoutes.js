const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');

router.route('/').get(homeController.getHome);

router.route('/test').get(homeController.getHome);

module.exports = router;
