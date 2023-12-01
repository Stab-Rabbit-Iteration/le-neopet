import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { useSelector, useDispatch } from 'react-redux'
import Form from './Form'
import { Link } from 'react-router-dom'
import PetPage from './PetPage'
import Dropdown from './Dropdown'
import StatusBar from './StatusBar'
import { setPets, changeHat } from '../reducers/userReducer'
import authFetch from '../axios/authFetch'

function PetSummary() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  console.log(user.pets)

  const getMyPets = async () => {
    try {
      setIsLoading(true)
      const response = await authFetch('/pets/get-my-pets')
      setIsLoading(false)
      dispatch(setPets(response.data))
    } catch (err) {
      console.log(err)
      setIsLoading(false)
    }
  }

  const handleHatChange = (petId) => {
    dispatch(changeHat({petId, currentPets: user.pets}))
  }

  useEffect(() => {
    getMyPets()
  }, [])

  if (isLoading) {
    return (
      <div className="loader">
        <div>Loading...</div>
        <div><img className="doxie" src= 'https://i.ibb.co/WP25hLK/doxie-walk.gif'></img></div>
      </div>
  )}


  return (
    <div id="summaryContainer">
      {/* <h1 style={{textAlign: 'center'}}>Your pets are hungry</h1> */}
      <div className="infoCard" id="summaryCards">
        {user.pets.map((ele) => {
          return (
            <div key={nanoid()} className="pet-card">
              <div className="pet-name">
                <Link to={`/petdetails/${ele._id}`}>
                  <p>{ele.name}</p>
                </Link>
              </div>
              <div className="pet-and-button">
                <img src={ele.picture} className="pet-pic"></img>
                <button onClick={() => handleHatChange(ele._id)} className="hat-btn">CHANGE MY VIBE</button>
              </div>
              <StatusBar hunger={ele.hunger} thirst={ele.thirst} petId={ele._id} />
            </div>
          )
        })}
      </div>
      {/* <div className="infoCard" id="create-pet"> */}
        {/* <Dropdown /> */}
        {/* <Form /> */}
      {/* </div> */}
    </div>
  )
}

export default PetSummary

// Pets with and without hats
// https://i.postimg.cc/wjxCHSZQ/cat.png
// https://i.postimg.cc/FK7wk09f/cat2.png
// https://i.postimg.cc/YCXJSdwK/cat2-beanie.png
// https://i.postimg.cc/kGx0X97f/cat-beanie.png
// https://i.postimg.cc/BQ3W78Cy/dog.png
// https://i.postimg.cc/SNfBByTK/dog-beanie.png
// https://i.postimg.cc/FRSqDmkN/hedgehog.png
// https://i.postimg.cc/25MMQ360/hedgehog-beanie.png
// https://i.postimg.cc/5yqrW3mr/rabbit.png
// https://i.postimg.cc/cCNzzjfY/rabbit-beanie.png

const petImages = {
  cat: ['https://i.postimg.cc/wjxCHSZQ/cat.png', 'https://i.postimg.cc/kGx0X97f/cat-beanie.png', "https://i.ibb.co/Pjkncvy/cat-beret.png", 'https://i.ibb.co/5WkNJPX/cat-chef.png'],
  cat2: ['https://ibb.co/3kCNdCJ', 'https://i.ibb.co/x3tJbDN/cat2.png', 'https://i.ibb.co/5h2vfmn/cat2-beanie.png', 'https://i.ibb.co/sVT60Hk/cat2-crown.png'],
  dog: ['https://i.postimg.cc/BQ3W78Cy/dog.png', 'https://i.postimg.cc/SNfBByTK/dog-beanie.png', 'https://i.ibb.co/LJ4BpTd/dog-beret.png', 'https://i.ibb.co/b2Jdd5m/dog-chef.png'],
  dog2: ['https://i.ibb.co/QMBNs0W/dog2.png', 'https://i.ibb.co/zH5FrqS/dog2-beanie.png', 'https://i.ibb.co/KhbfR3V/dog2-chef.png', 'https://i.ibb.co/grLtYHF/dog2-hp.png', 'https://i.ibb.co/jbSpWmT/dog2-party.png'],
  hedgehog: ['https://i.postimg.cc/FRSqDmkN/hedgehog.png','https://i.postimg.cc/25MMQ360/hedgehog-beanie.png', 'https://i.ibb.co/3fmX2xL/hedgehog-chef.png'],
  rabbit: ['https://i.postimg.cc/5yqrW3mr/rabbit.png', 'https://i.postimg.cc/cCNzzjfY/rabbit-beanie.png', 'https://i.ibb.co/4tSk9Vv/rabbit-hp.png', 'https://i.ibb.co/F8rbYC6/rabbit-pirate.png'],
  snake: ['https://i.ibb.co/b221ck0/snek.png', 'https://i.ibb.co/c8Q9rh3/snek-beanie.png', 'https://i.ibb.co/TK1B1x5/snek-hp.png', 'https://i.ibb.co/4Fk4dGj/snek-crown.png', 'https://i.ibb.co/xYw9Z5s/snek-spin.png'],
  mole: ['https://i.ibb.co/80HJq6S/laura.png', 'https://i.ibb.co/BBq0PKX/laura-pink.png', 'https://i.ibb.co/fNcjcSx/laura-chef.png', 'https://i.ibb.co/NxYqXYG/laura-beanie.png']
}
