/*
    Checkout page grants you the ability to view what items you ordered and remove any
    that you dont wish to have. On submit it calculates the total and sends the order to the db.
    TODO: Add a 3rd party payments API
*/
import React,{useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import SubPreviewMenu from "../menu/SubPreviewMenu";
import { useSelector,useDispatch } from 'react-redux';
import APIpage from '../../APIpage';
import { viewCart, deleteMenuItems, clearCart } from './cartSlice';
//Here will be where they review items ordered and go to the payment service
const Checkout=()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //could have a loading issue with larger orders-- not sure yet we'll see
    var orderedItems = useSelector(viewCart);
    useEffect(() => {
        console.log('RELOADED');
    }, [orderedItems])
    // can reuse SubPreviewMenu(in menu folder), react X-pert DA
    const remove=(id)=>{
        dispatch(deleteMenuItems(id));
    }
    const totalCost=()=>{
        let total = 0;
        let ids = [];
        for(let o of orderedItems.cart){
            //strings to floats
            total +=parseFloat(o.cost);
            ids.push(o.id);
        }
        total= Math.round((total + Number.EPSILON) * 100) / 100;
        //These are what we're going to want to send to the backend.
        let tableInfo = JSON.parse(localStorage.getItem('_table'));
        let finalOrder = {...tableInfo};
        finalOrder['ids'] = ids;
        finalOrder['totalcost'] = total;

        console.log('TOTAL COST:', total);
        console.log('TABLE METADATA:', tableInfo);
        console.log('FINAL ORDER:', finalOrder);
        dispatch(clearCart());
        //Shouldnt need an async await on this
        APIpage.addOrder(finalOrder); 
        navigate('/ordersuccess');
        //return total; // send to 3rd party payment page
    }

    //navigate('/paymentMethod') instead of console log
    return (
        <div className="h-screen text-center">
            <h1>Please Confirm this is what you wish to order</h1>
            { <SubPreviewMenu itemArr={orderedItems} remove={remove}/> }
            
            <button type="button" onClick={() => totalCost()} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Pay and Continue</button>
        </div>
    )
}

export default Checkout;