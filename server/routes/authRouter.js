const express = require('express');
const authController = require('../controller/authController');
const currentUser = require('../middlewares/currentUser')
const router = express.Router();

router.post('/login', authController.login)
router.post('/signup', authController.signup)
router.post('/logout', authController.logout)
router.use(currentUser)
router.get('/current-user', authController.getCurrentUser)

module.exports = router;
