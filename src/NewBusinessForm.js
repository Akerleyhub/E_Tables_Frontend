import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

//Will need to input their business name, color scheme 1 for now, business logo
const NewBusinessForm=()=>{
    const navigate = useNavigate();

    const initialState = {
        business_name:'',
        img:'',
    }
    //state for the inputs/color
    const [formText,setformText] = useState(initialState);
    const [color, setColor] = useColor("hex", "#121212");

    //changes the state of inputs for each typed character
    const handleChange=(e)=>{
        const {name, value} = e.target;
        setformText(formText => ({
            ...formText,
            [name]:value
        }))
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        //getFormData(formText); //DISPATCH HERE INSTEAD?
        //add color since it's in a different way currently
        initialState['color'] = color; 

        //convert the image to base64 string if it's not already

        //sets the form back to empty and sends to jobs page
        setformText(initialState);
        navigate('/menucreation');
    }
    //color handle code
    
    return (
        <div className='container h-screen content-center'>
            <form onSubmit = {handleSubmit} className="">
                <div className="mb-6">
                    <label for="business_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Business Name</label>
                    <input type="business_name" name="business_name" id="business_name" value = {formText.business_name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" placeholder="Cool Business Name" required />
                </div> 
                <h4>Choose Color:</h4>
                <ColorPicker width={456} height={228} 
                   color={color} 
                   onChange={setColor} hideHSV dark />
                <div class="flex justify-center items-center w-full">
                    <label for="dropzone-file" class="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div class="flex flex-col justify-center items-center pt-5 pb-6">
                            <svg aria-hidden="true" class="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG(MAX. 800x400px)</p>
                        </div>
                        <input id="dropzone-file" name="img" type="file" class="hidden" />
                    </label>
                </div> 
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </div>
    )
}

export default NewBusinessForm;