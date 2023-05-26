/*
    This will be the screen they encounter after they select a payment plan.
    Tanner said this was going to happen somewhere else so may not be needed.
    Will need to input their business name, color scheme 1 for now, business logo.
    ^ Will want to make this a form. Probably want these and the ability to update most apsects of the business.
*/
import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import NewBusinessForm from './NewBusinessForm';


const NewBusiness=()=>{
    const navigate = useNavigate();

    const transfertoPay=(e)=>{
        e.preventDefault();
        navigate('/');
    }
    
    return (
        <div className='container h-screen text-center'>
            <h1>Thanks for chosing E-Tables!</h1>
            <h3>Let's start your set up</h3>
            <NewBusinessForm />
            {/* <button onClick={()=>navigate('/menucreation')}>Next</button> */}
        </div>
    )
}

export default NewBusiness;