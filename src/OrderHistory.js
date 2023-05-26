/*
    Place where the customer can view the last 5 items they ordered. 
    For future it might be worth granting them ability to re-order from here.
    Can make use of SubPreviewMenu if so and pass in the smaller set from the API.
*/
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
//import SubPreviewMenu from './features/menu/SubPreviewMenu';

import APIpage from './APIpage';

const OrderHistory=()=>{
    let navigate = useNavigate();
    let tableInfo = JSON.parse(localStorage.getItem('_table'));
    let {tableid, bussinessid} = tableInfo;
    const orderUrl = `/table/${bussinessid}/${tableid}`;
    
    const [histItems,setHistItems] = useState();

    useEffect(() => {
        async function loadOrdered() {
            let load = await APIpage.orderHist(); 
            setHistItems(load);
        }
      
        // call the function
        loadOrdered().catch(console.error);
    }, []);

    const remove=()=>{
        console.log('Moo')
    }

    let elements = histItems.data;
    //<SubPreviewMenu itemArr={histItems} remove={remove} />
    return (
        <div className='container h-screen text-center'>
            {elements.map(e=>
                <div>
                    <h1>{e.name}</h1>
                    <h2>{e.description}</h2>
                    <h2>{e.cost}</h2>
                </div>
            )}
            <button type="button" onClick={() => navigate(orderUrl)} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Back to Order</button>
        </div>
    )
};

export default OrderHistory;