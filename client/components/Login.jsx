import React, {useEffect, useState} from 'react'
import authFetch from '../axios/authFetch'
import {useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import doxie_gif from '../assets/doxie_gif.gif'

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    if (user.userId) {
      navigate('/petpage')
      // change to unique userId page to display all of their pets
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!username || !password) return 

    const endpoint = isLogin ? '/login' : '/signup'

    try {
      const response = await authFetch.post('/auth' + endpoint, {
        username, password
      })
      dispatch(loginUser({
        username: response.data.username,
        userId: response.data._id,
      }))
    } catch (err) {
      console.log(err);
      window.alert(err.response.data.err)
    }
  }

  return (
    <div className='login-container'>
      <form onSubmit={(e) => handleSubmit(e)} className='login-form'>
        <h2 className='login-title'>WELCOME TO DIGIPET!🐰🗡️</h2>
        <label className='login-label' htmlFor='username'>USERNAME</label>
        <input className='login-input' type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label className='login-label' htmlFor='password'>PASSWORD</label>
        <input className='login-input' type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className='login-btn btn'>{isLogin ? "LOGIN" : "SIGN UP"}</button>
      </form>
      {isLogin ? (
        <p className='login-swap'>Not a member? <span className='login-swap-span' onClick={() => setIsLogin(!isLogin)}>Sign Up</span></p>
      )
        : (
          <p className='login-swap'>Already a member? <span className='login-swap-span' onClick={() => setIsLogin(!isLogin)}>Login</span></p>
        )}
      <img
        className="doxie"
        src={doxie_gif}
        alt="ween gang"
      />
    </div>
  )
}

export default Login