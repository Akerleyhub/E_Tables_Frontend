import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import FoodItem from './FoodItem';
import DrinkItem from './DrinkItem';
//import APIpage from './APIpage';

import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';

import {
    addFoodItem, addDrinkItem, viewMenu
} from './menuSlice';


//form for either adding a new drink or food item passes to app
const MenuCreation=()=>{
    //want two options that can be selected food or drink
    //const [formText,setformText] = useState(initialState);
    //Doing this for now in case there's more than just food and drink, otherwise we only need one since true/false logic
    const [foodSelect,setfoodSelect] = useState(true);
    const [drinkSelect,setdrinkSelect] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    //Grabbing the global state of menu
    const menu = useSelector(viewMenu);

    console.log(menu.menu);
    const swap=(status)=>{
        setfoodSelect(status);
        setdrinkSelect(!status);
    }
    //want to add to redux-global-state here, process pictire to base64 as well
    const getFormData=(item,base64Img)=>{
        //update global state
        function addItem(itemobj,img) {
            //console.log(itemobj);

            //const {name,cost,itemType,description,foodordrink} = itemobj;
            //adding the base64 image to the object
            itemobj['img'] = img;
           
            //https://www.npmjs.com/package/uuid
            //wanting to add ID so that the filter delete will work, can trim off in the backend in favor of primary key
            itemobj['id'] = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

            if(itemobj.foodordrink === 'food') dispatch(addFoodItem(itemobj));
            if(itemobj.foodordrink === 'drink') dispatch(addDrinkItem(itemobj));
        }
        addItem(item,base64Img);
    }

    //get all food items, get all drink items, tie them all together with json. Send to db.
    const finalize=()=>{
        //get json, call API to send away to backend world
        //const menu = useSelector(viewMenu);
        console.log('ass');
        console.log(menu)
        //call API here and send all menu json to backend
    }

    //could probably should put food and drink in the same component if I used tenary in all the different spots
    //https://stackoverflow.com/questions/30765163/pretty-printing-json-with-react
    return (
        <div className='container h-screen text-center'>
            <button onClick={() => swap(true)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Food</button>
            <button onClick={() => swap(false)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Drink</button>

            <button onClick={() => navigate('/viewMenu')} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 float-right">View Full Menu</button>
            {foodSelect ? <FoodItem getFormData={getFormData}/>: <DrinkItem getFormData={getFormData}/>}
            {/* <h3>{JSON.stringify(menu, null, 2)}</h3> */}
            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"onClick={() => finalize()}>Finalize Menu!</button>
        </div>
    )
}

export default MenuCreation;



