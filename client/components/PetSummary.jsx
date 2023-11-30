import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { useSelector, useDispatch } from 'react-redux'
import Form from './Form'
import { Link } from 'react-router-dom'
import PetPage from './PetPage'
import Dropdown from './Dropdown'
import StatusBar from './StatusBar'
import { setPets } from '../reducers/userReducer'
import authFetch from '../axios/authFetch'

const samplePets = [
  {
    userid: 3477234382394,
    name: 'Sample Pet1',
    hunger: 50,
    thirst: 50,
    life: true,
    age: 10,
    picture: 'sample_picture.jpg',
  },
  {
    userid: 3477234382222,
    name: 'Sample Pet2',
    hunger: 80,
    thirst: 20,
    life: true,
    age: 10,
    picture: 'sample_picture.jpg',
  },
  {
    userid: 3477234332394,
    name: 'Dead Pet',
    hunger: 100,
    thirst: 100,
    life: false,
    age: 10,
    picture: 'sample_picture.jpg',
  },
]

function PetSummary() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)

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

  useEffect(() => {
    getMyPets()
  }, [])

  if (isLoading) {
    return <p className="loader">Loading...</p>
  }

  return (
    <div id="summaryContainer">
      <div className="infoCard" id="summaryCards">
        {user.pets.map((ele) => {
          return (
            <Link key={nanoid()} to={`/PetPage/${ele.id}`}>
              <p>{ele.name}</p>
              <img src={ele.picture}></img>
              <StatusBar hunger={ele.hunger} thirst={ele.thirst} />
            </Link>
          )
        })}
      </div>
      <div className="infoCard" id="create-pet">
        {/* <Dropdown /> */}
        <Form />
      </div>
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
