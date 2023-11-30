const express = require('express');
const petController = require('../controller/petController');
const currentUser = require('../middlewares/currentUser')
const router = express.Router();

router.use(currentUser)
router.get('/get-my-pets', petController.getMyPets)
router.patch('/update-pet', petController.updatePet)

module.exports = router;
