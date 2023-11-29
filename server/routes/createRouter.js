const express = require('express');
const petController = require('../controller/controller');
const userController = require('../controller/userController');
const router = express.Router();


router.get('/', (req, res) => {
  console.log('made it to petPageRouter');
  return res.status(200);
});

router.get('/pets', petController.getPets, (req, res) => {
  // console.log('made it to api', res.locals.getPets);
  return res.status(200).json(res.locals.getPets);
});

router.get('/pets/:id', petController.getOnePet, (req, res) => {
  return res.status(200).json(res.locals.getOnePet);
});

//POTENTIALLY IRRELEVANT
router.get('/', userController.getAllUsers, (req, res) => { 
  res.status(200).json(res.locals.getAllUsers);
});

// POST req
// router.post('/', petController.postPet, (req, res) => {
router.post('/', petController.postPet, (req, res) => {
  return res.status(200).json(res.locals.postPets);
});

//POTENTIALLY IRRELEVANT
// post req to log in, redirect to create-pet page
router.post('/', userController.verifyUser, (req, res) => {
  res.redirect('/create');
});

//POTENTIALLY IRRELEVANT
// post req to  sign up, once signed up, redirect to log-in
router.post('/signup', userController.createUser, (req, res) => {
  res.redirect('/create');
});

//PATCH req
router.patch('/pets/:id', petController.updatePet, (req, res) => {
  res.status(200).json(res.locals.updatePet);
});

//DELETE req - NOT CALLED ANYWHERE
// router.delete('/pets', petController.releaseAll, (req, res) => {
//   return res.status(200).json();
// });

// router.delete('/pets/:id', petController.releasePet, (req, res) => {
//   res.status(200).json(res.locals.releasePet);
// });

module.exports = router;
