const Pet = require('../model/petModel')

const petController = {}

const samplePets = [
  {
    name: 'Pika',
    hunger: 80,
    thirst: 40,
    life: true,
    age: 15,
    picture: 'jpeg',
  },
  {
    name: 'Poppy',
    hunger: 90,
    thirst: 20,
    life: true,
    age: 1,
    picture: 'jpeg',
  },
  {
    name: 'Steve',
    hunger: 100,
    thirst: 100,
    life: true,
    age: 5,
    picture: 'jpeg',
  },
]

petController.getMyPets = async (req, res, next) => {
  console.log('💥 petController.getMyPets');
  const { currentUser } = req
  console.log(currentUser);

  // TEMPORARY PET CREATOR
  const tempPets = samplePets.map(pet => ({
    ...pet,
    userId: currentUser._id
  }))
  await Pet.create(tempPets)
  // TEMPORARY PET CREATOR


  if (!currentUser) {
    return next({
      log: 'Error from: petsController.getMyPets - No current user',
      status: 401,
      message: {err: 'Not authorized'}
    })
  }

  try {


    const pets = await Pet.find({ userId: currentUser._id })

    return res.status(200).json(pets)
  } catch (err) {
    return next({
      log: `Error from: petsController.getMyPets - ${err}`,
      status: 500,
      message: {err}
    })
  }
}

petController.updatePet = async (req, res, next) => {
  const { petId, update } = req.body
  
  try {
    const pet = await Pet.findById(petId)
    console.log(pet);
    return res.status(200).json({msg: 'Hello from petController.updatePet'})
  } catch (err) {
    return next({
      log: `Error from: petsController.getMyPets - ${err}`,
      status: 500,
      message: {err}
    })
  }
}

module.exports = petController