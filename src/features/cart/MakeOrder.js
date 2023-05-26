import React from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddCart from "./AddCart";

import { addMenuItems } from './cartSlice';

//Here will be where they can view and select menu items, onClick made the card turn green. Probably use a radio button of this
const MakeOrder=()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    //get menu, order it, view it
    //const menu = useSelector(viewMenu);

    //need to find a way to get this info based off the checkbox
    const addSelected=()=>{
        var checkboxes = document.getElementsByName('checkerbox');
        var vals = [];

        for (var i=0, n=checkboxes.length;i<n;i++) 
        {
            if (checkboxes[i].checked) 
            {
                //vals.push(checkboxes[i].id);
                vals.push(checkboxes[i].value);
            }
        }

        dispatch(addMenuItems(vals));
        navigate('/checkout');
    }


    return (
        <div className="container h-screen text-center">
            {<AddCart addSelected={addSelected}/>}
        </div>
    )
}

export default MakeOrder;