
import React from 'react';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import CreatePage from './components/CreatePage.jsx';
import PetPage from './components/PetPage.jsx';
import Login from './components/Login.jsx';
import './styles.scss'

function App(){
    return(
        <Routes>
            <Route exact path='/' Component={Login} />
            <Route exact path='/petpage' Component={PetPage} />
            <Route exact path ='/petpage/:id' Component={PetPage} />
            {/* <Route exact path='/login' Component={LoginPage} */}
            {/* unfinished path for login component ^ */}
        </Routes>
    )
}

export default App;
