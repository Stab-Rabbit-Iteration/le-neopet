const express = require('express');
const authController = require('../controller/authController');
const router = express.Router();

router.post('/login', authController.login)
router.post('/signup', authController.signup)
router.post('/logout', authController.logout)

module.exports = router;
