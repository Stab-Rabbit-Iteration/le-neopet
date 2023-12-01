import React from 'react'
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import StatusBar from './StatusBar'

const PetDetails = () => {
  const { pets } = useSelector(state => state.user)
  console.log(pets)
  const {id} = useParams()
  const currentPet = pets.filter(pet => pet._id === id)[0]

  return (
    <div className="pet-details">
    <h1 className="petTitle">{currentPet.name}</h1>
    <img className="pet-image" src={currentPet.picture} alt={currentPet.name} />
    <div className="pet-info">
      <h2>Age: {currentPet.age}</h2>
      <h2>Pet Type: {currentPet.petType}</h2>
      <h2>Status: {currentPet.life ? 'Thriving' : 'Taking a Long Nap'}</h2>
      <StatusBar hunger={currentPet.hunger} thirst={currentPet.thirst} />
    </div>
  </div>
  )
}

export default PetDetails

// {
//     "_id": "6568ff5a949aed2f1590060b",
//     "userId": "6567bbbda9a1ae2d8fed1d67",
//     "name": "Poppy",
//     "petType": "dog",
//     "hunger": 90,
//     "thirst": 20,
//     "life": true,
//     "age": 1,
//     "picture": "https://i.postimg.cc/BQ3W78Cy/dog.png",
//     "__v": 0
// }