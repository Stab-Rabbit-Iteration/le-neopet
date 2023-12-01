import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: null,
  userId: null,
  pets: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      console.log('💥 userSlice.reducer.loginUser')
      const { username, userId } = action.payload
      state = {
        username,
        userId,
      }
      return state
    },
    setPets: (state, action) => {
      console.log('💥 userSlice.reducer.setPets')
      state.pets = action.payload
      return state
    },
    changeHat: (state, action) => {
      const petImages = {
        cat: ['https://i.postimg.cc/wjxCHSZQ/cat.png', 'https://i.postimg.cc/kGx0X97f/cat-beanie.png', "https://i.ibb.co/Pjkncvy/cat-beret.png", 'https://i.ibb.co/5WkNJPX/cat-chef.png'],
        cat2: ['https://i.ibb.co/Kmrqhr1/strongcat.png', 'https://i.ibb.co/nP5Sr9z/buff-Cat-beanie.png', 'https://i.ibb.co/2SZwXjJ/buff-Cat-backwardshat.png', 'https://i.ibb.co/sVT60Hk/cat2-crown.png'],
        dog: ['https://i.postimg.cc/BQ3W78Cy/dog.png', 'https://i.postimg.cc/SNfBByTK/dog-beanie.png', 'https://i.ibb.co/LJ4BpTd/dog-beret.png', 'https://i.ibb.co/b2Jdd5m/dog-chef.png'],
        hedgehog: ['https://i.postimg.cc/FRSqDmkN/hedgehog.png','https://i.postimg.cc/25MMQ360/hedgehog-beanie.png', 'https://i.ibb.co/3fmX2xL/hedgehog-chef.png'],
        rabbit: ['https://i.postimg.cc/5yqrW3mr/rabbit.png', 'https://i.postimg.cc/cCNzzjfY/rabbit-beanie.png', 'https://i.ibb.co/4tSk9Vv/rabbit-hp.png', 'https://i.ibb.co/F8rbYC6/rabbit-pirate.png'],
        snake: ['https://i.ibb.co/b221ck0/snek.png', 'https://i.ibb.co/c8Q9rh3/snek-beanie.png', 'https://i.ibb.co/TK1B1x5/snek-hp.png', 'https://i.ibb.co/4Fk4dGj/snek-crown.png', 'https://i.ibb.co/xYw9Z5s/snek-spin.png'],
        mole: ['https://i.ibb.co/80HJq6S/laura.png', 'https://i.ibb.co/BBq0PKX/laura-pink.png', 'https://i.ibb.co/fNcjcSx/laura-chef.png', 'https://i.ibb.co/NxYqXYG/laura-beanie.png']
      }
      console.log('💥 ChangeMyHat!')
      const { petId, currentPets } = action.payload
      const thisPetIndex = currentPets.findIndex(pet => pet._id === petId)
      const thisPet = currentPets[thisPetIndex]
      const imageOptions = petImages[thisPet.petType]
      const optionsLength = imageOptions.length
      const currentHatIndex = imageOptions.findIndex(hat => hat === thisPet.picture)
      let newHat
      if (currentHatIndex + 1 >= optionsLength) {
        newHat = imageOptions[0]
      } else {
        newHat = imageOptions[currentHatIndex + 1]
      }
      const updatedPet = { ...thisPet, picture: newHat }
      let updatedPets = currentPets.slice()
      updatedPets[thisPetIndex] = updatedPet
      state.pets = updatedPets
      return state
    }
  },
})

export const { loginUser, setPets, changeHat } = userSlice.actions
export default userSlice.reducer
