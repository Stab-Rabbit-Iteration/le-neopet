const Pet = require('../model/petModel')

const petController = {}

const petImages = {
  cat: ['https://i.postimg.cc/wjxCHSZQ/cat.png', 'https://i.postimg.cc/kGx0X97f/cat-beanie.png'],
  cat2: ['https://i.postimg.cc/FK7wk09f/cat2.png', 'https://i.postimg.cc/YCXJSdwK/cat2-beanie.png'],
  dog: ['https://i.postimg.cc/BQ3W78Cy/dog.png', 'https://i.postimg.cc/SNfBByTK/dog-beanie.png'],
  hedgehog: ['https://i.postimg.cc/FRSqDmkN/hedgehog.png','https://i.postimg.cc/25MMQ360/hedgehog-beanie.png'],
  rabbit: ['https://i.postimg.cc/5yqrW3mr/rabbit.png', 'https://i.postimg.cc/cCNzzjfY/rabbit-beanie.png'],
  mole: ['', 'https://i.ibb.co/0ZxkwDr/laura-pink.png', '']
}

petController.getMyPets = async (req, res, next) => {
  console.log('💥 petController.getMyPets')
  const { currentUser } = req
  console.log(currentUser)

  // TEMPORARY PET CREATOR
  // const samplePets = [
  //   {
  //     name: 'Pika',
  //     petType: 'cat',
  //     hunger: 80,
  //     thirst: 40,
  //     life: true,
  //     age: 15,
  //     picture: 'https://i.postimg.cc/wjxCHSZQ/cat.png',
  //   },
  //   {
  //     name: 'Poppy',
  //     petType: 'dog',
  //     hunger: 90,
  //     thirst: 20,
  //     life: true,
  //     age: 1,
  //     picture: 'https://i.postimg.cc/BQ3W78Cy/dog.png',
  //   },
  //   {
  //     name: 'Steve',
  //     petType: 'hedgehog',
  //     hunger: 100,
  //     thirst: 100,
  //     life: true,
  //     age: 5,
  //     picture: 'https://i.postimg.cc/FRSqDmkN/hedgehog.png',
  //   },
  //   {
  //     name: 'Laura',
  //     petType: 'mole',
  //     hunger: 100,
  //     thirst: 100,
  //     life: true,
  //     age: 5,
  //     picture: 'https://i.ibb.co/80HJq6S/laura.png',
  //   },
  //   {
  //     name: 'Josh',
  //     petType: 'snake',
  //     hunger: 100,
  //     thirst: 100,
  //     life: true,
  //     age: 25,
  //     picture: 'https://i.ibb.co/b221ck0/snek.png',
  //   },
  //   {
  //     name: 'Carly',
  //     petType: 'rabbit',
  //     hunger: 100,
  //     thirst: 100,
  //     life: true,
  //     age: 25,
  //     picture: 'https://i.postimg.cc/5yqrW3mr/rabbit.png',
  //   },
  //   {
  //     name: 'McKenzie',
  //     petType: 'cat2',
  //     hunger: 100,
  //     thirst: 30,
  //     life: true,
  //     age: 12,
  //     picture: 'https://i.postimg.cc/FK7wk09f/cat2.png',
  //   }
  // ]

  // const tempPets = samplePets.map((pet) => ({
  //   ...pet,
  //   userId: currentUser._id,
  // }))
  // await Pet.create(tempPets)
  // TEMPORARY PET CREATOR

  if (!currentUser) {
    return next({
      log: 'Error from: petsController.getMyPets - No current user',
      status: 401,
      message: { err: 'Not authorized' },
    })
  }

  try {
    const pets = await Pet.find({ userId: currentUser._id })

    console.log('🐶 My Pets', pets)
    return res.status(200).json(pets)
  } catch (err) {
    return next({
      log: `Error from: petsController.getMyPets - ${err}`,
      status: 500,
      message: { err },
    })
  }
}

petController.updatePet = async (req, res, next) => {
  const { petId, update } = req.body

  try {
    const pet = await Pet.findById(petId)
    console.log(pet)
    return res.status(200).json({ msg: 'Hello from petController.updatePet' })
  } catch (err) {
    return next({
      log: `Error from: petsController.getMyPets - ${err}`,
      status: 500,
      message: { err },
    })
  }
}

module.exports = petController
