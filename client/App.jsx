
import React from 'react';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx'
import PetSummary from './components/PetSummary.jsx';
import PetPage from './components/PetPage.jsx';
import Login from './components/Login.jsx';
import './scss/styles.scss'

function App(){
    return (
        <div className='main-container'>
            <Header />
            <Routes>
                <Route exact path='/' Component={Login} />
                <Route exact path='/petpage' Component={PetSummary} />
                <Route exact path ='/petpage/:id' Component={PetPage} />
            </Routes>
        </div>
    )
}

export default App;
