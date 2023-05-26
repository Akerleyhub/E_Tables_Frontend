/*
    May be a wasted page. Maybe we add a domino's esc order bar. 
    So they can track how far long their order is?
*/
import React from "react";
import { useNavigate } from 'react-router-dom';

//Here will be where they can view and select menu items, onClick made the card turn green. Probably use a radio button of this
const OrderSuccess=()=>{
    let navigate = useNavigate();
    let tableInfo = JSON.parse(localStorage.getItem('_table'));
    let {tableid, businessid} = tableInfo;
    const orderUrl = `/table/${businessid}/${tableid}`;

    return (
        <div className='container h-screen text-center'>
            <h1>Thank you for your order. It is being made now and will be brough out when complete</h1>
            <h2>You will be getting recipt email shortly</h2>
            <button type="button" onClick={() => navigate(orderUrl)} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Order More</button>
        </div>
    )
};

export default OrderSuccess;