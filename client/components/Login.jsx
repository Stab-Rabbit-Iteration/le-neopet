import React, {useEffect, useState} from 'react'
import authFetch from '../axios/authFetch'
import {useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.users)

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
    <div style={{ width: "100%", height: '100vh', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor='username'>username</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor='password'>password</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button>{isLogin ? "Login" : "Sign Up"}</button>
      </form>
      {isLogin ? (
        <p>Not a member? <span onClick={() => setIsLogin(!isLogin)} style={{ color: "blue" }}>Sign Up</span></p>
      )
        : (
          <p>Already a member? <span onClick={() => setIsLogin(!isLogin)} style={{ color: "blue" }}>Login</span></p>
        )}
    </div>
  )
}

export default Login