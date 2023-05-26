import React,{useState} from 'react';

const DrinkItem=({getFormData})=>{
    const initialState = {
        name:'',
        cost:'',
        //itemType:'',
        description:'',
        //img:'',
        foodordrink:'drink'
    };
    //state for the inputs
    const [formText,setformText] = useState(initialState);
    const [image,setImage] = useState([]);
    const [dropdown, setDropdown] = useState('Select Drink Type');

    //changes the state of inputs for each typed character
    const handleChange=(e)=>{
        const {name, value} = e.target;
        setformText(formText => ({
            ...formText,
            [name]:value
        }))
    }
    const handleDropdownChange=(e)=> setDropdown(e.target.value);

    //process image, base64 encode it for DB. https://stackoverflow.com/questions/51272255/how-to-use-filereader-in-react
    function onImageChange(event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function(event) {
            // The file's text will be printed here
            setImage(event.target.result);
        };
        reader.readAsDataURL(file);
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        formText["itemType"] = dropdown;

        getFormData(formText,image);
        //sets the form back to empty and sends to jobs page
        setformText(initialState);
        //navigate('/');
    }

    return (
        <div className="h-screen text-center">
            <p className='font-bold text-white m-6'>DRINK</p>
            <form onSubmit = {handleSubmit} className="">
                <div className="mb-6">
                    <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Drink Name:</label>
                    <input type="name" name="name" id="name" value = {formText.name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" placeholder="Pinecolata Special ;)" required />
                </div> 
                <div className="mb-6">
                    <label for="cost" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cost:</label>
                    <input type="cost" name="cost" id="cost" value = {formText.cost} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" placeholder="12.99" required />
                </div>
                <div className="mb-6">
                    <label for="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Description:</label>
                    <input type="description" name="description" id="description" value = {formText.description} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" placeholder="Pineapple juice and coconut milk" required />
                </div>

                
                <div class="mb-3 xl:w-96">
                    <select onChange={handleDropdownChange} name="itemType" class="form-select appearance-none
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding bg-no-repeat
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                        <option selected>{dropdown}</option>
                        <option value="Non">Non-Alcoholic beverage</option>
                        <option value="Alcohol">Alcoholic beverage</option>
                    </select>
                </div>

                <input type="file" name="img" accept="image/*" onChange={onImageChange} />
                 
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Drink to Menu</button>
            </form>
        </div>
    )
}

export default DrinkItem;

/*
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
*/