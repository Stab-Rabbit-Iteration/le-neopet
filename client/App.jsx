
import React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PetSummary from './components/PetSummary.jsx';
import PetPage from './components/PetPage.jsx';
import './styles.scss'

function App(){
    return(
        <Router>
            <Routes>
                <Route exact path='/:username' Component={PetSummary} />
                <Route exact path='/petpage' Component={PetPage} />
                <Route exact path ='/petpage/:id' Component={PetPage} />
                {/* <Route exact path='/login' Component={LoginPage} */}
                {/* unfinished path for login component ^ */}
            </Routes>
        </Router>
    )
}

export default App;
