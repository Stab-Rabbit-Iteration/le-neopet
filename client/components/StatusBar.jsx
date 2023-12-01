import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import {useSelector} from 'react-redux'
import authFetch from '../axios/authFetch'

function StatusBar (props) {
    const [hunger, setHunger] = useState(props.hunger);
    const [thirst, setThirst] = useState(props.thirst);
    const { id } = useParams();
    
    const updatePet = async (update) => {
        
    }

    const handleFeedButton = () => {
        setHunger((prevHunger) => Math.min(prevHunger + 10, 100));
    }

    const handleHydrateButton = () => {
        setThirst((prevThirst) => Math.min(prevThirst + 10, 100));
    }


    useEffect(() => {

        const decreaseHungerThirst = setInterval(() => {
            setHunger((prevHunger) => Math.max(prevHunger - 2.5, 0));
            setThirst((prevThirst) => Math.max(prevThirst - 5, 0));
        }, 15000)

        return () => clearInterval(decreaseHungerThirst);
    }, [])

    return(
    <div className="statusbar">
        <span id="hunger">Hunger:</span>
        <progress value={hunger} max="100"></progress>
        <br/>
        <button onClick={handleFeedButton}>🍕 Feed</button>
        <br/>
        <span id="thirst">Thirst:</span>
        <progress value={thirst} max="100"></progress>
        <br/>
        <button onClick={handleHydrateButton}>💧 Hydrate</button>
    </div>
    )
}

export default StatusBar
