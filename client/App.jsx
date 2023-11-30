
import React from 'react';
import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { loginUser } from './reducers/userReducer.js'
import { Route, Routes, useNavigate } from 'react-router-dom';
import authFetch from './axios/authFetch.js'
import Header from './components/Header.jsx'
import PetSummary from './components/PetSummary.jsx';
import PetPage from './components/PetPage.jsx';
import PetDetails from './components/PetDetails.jsx';
import Login from './components/Login.jsx';
import './scss/styles.scss'

function App() {
    const user = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const getCurrentUser = async () => {
        try {
            const response = await authFetch('/auth/current-user')
            if (response.data.username) {
                dispatch(loginUser({
                    username: response.data.username,
                    userId: response.data._id,
                }))
            }
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getCurrentUser()
    }, [])

    useEffect(() => {
        if (user.userId) {
            navigate('/petpage')
        }
    }, [user])

    return (
        <div className='main-container'>
            <Header />
            <Routes>
                <Route exact path='/' Component={Login} />
                <Route exact path='/petpage' Component={PetSummary} />
                <Route exact path ='/petdetails/:id' Component={PetDetails} />
            </Routes>
        </div>
    )
}

export default App;
