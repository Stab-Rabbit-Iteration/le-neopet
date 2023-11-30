import React from 'react';
import { useSelector } from 'react-redux';
import Form from './Form';
import { Link } from 'react-router-dom';
import PetPage from './PetPage';
import Dropdown from './Dropdown';


function PetSummary({ props }) {
  
 const data = useSelector((state) => state.pets);

 const petArray = [];
  data.forEach((ele) => {
    petArray.push(
        <Link to={`/PetPage/${ele.id}`}>
          {ele.name}
          {ele.picture}
        </Link> 
    )
  });
  
  return (
    <div id='summaryContainer'>
      <div className="infoCard" id="summaryCards">
        { petArray }
      </div>
      <div className="infoCard" id='create-pet'>
        <Dropdown />
        <Form />
      </div>
    </div>
  );
}

export default PetSummary;
