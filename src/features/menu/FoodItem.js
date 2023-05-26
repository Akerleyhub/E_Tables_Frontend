import React,{useState} from 'react';

const FoodItem=({getFormData})=>{
    const initialState = {
        name:'',
        cost:'',
        //itemType:'',
        description:'',
        //img:'',
        foodordrink:'food'
    };
    //state for the inputs
    const [formText,setformText] = useState(initialState);
    const [image,setImage] = useState([]);
    const [dropdown, setDropdown] = useState('Select Food Type');

    //changes the state of inputs for each typed character
    const handleChange=(e)=>{
        const {name, value} = e.target;
        setformText(formText => ({
            ...formText,
            [name]:value
        }))
    }
    const handleDropdownChange=(e)=>{
        setDropdown(e.target.value);
    }

    //process image, base64 encode it for DB. https://stackoverflow.com/questions/51272255/how-to-use-filereader-in-react
    function onImageChange(event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function(event) {
            // The file's text will be printed here
            setImage(event.target.result);
        };
        reader.readAsDataURL(file);
        //reader.readAsText(file);
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        formText["itemType"] = dropdown;
        getFormData(formText,image); //DISPATCH HERE INSTEAD?

        //sets the form back to empty and sends to jobs page
        setformText(initialState);
        //navigate('/');
    }

    return (
        <div className="h-screen text-center">
            <p className='font-bold text-white m-6'>FOOD</p>
            <form onSubmit = {handleSubmit} className="">
                <div className="mb-6">
                    <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Food Name:</label>
                    <input type="name" name="name" id="name" value = {formText.name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" placeholder="Turkey Sammich" required />
                </div> 
                <div className="mb-6">
                    <label for="cost" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cost:</label>
                    <input type="cost" name="cost" id="cost" value = {formText.cost} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" placeholder="12.99" required />
                </div>
                <div className="mb-6">
                    <label for="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Description:</label>
                    <input type="description" name="description" id="description" value = {formText.description} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" placeholder="Turkey with Beef Wellington on cosco bread" required />
                </div>

                
                <div class="mb-3 xl:w-96">
                    <select onChange={handleDropdownChange} class="form-select appearance-none
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
                        <option value="Appitizor">Appitizor</option>
                        <option value="Entree">Entree</option>
                        <option value="Dessert">Dessert</option>
                    </select>
                </div>

                <input type="file" name="img" accept="image/*" onChange={onImageChange} />

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Food to Menu</button>
            </form>
        </div>
    )
}

export default FoodItem;
    
/*
Matches UI better but they are link instead of select which I no like
<button id="dropdownDefault" data-dropdown-toggle="dropdown" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown button <svg class="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>

                <div id="dropdown" class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
                    <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
                    <li>
                        <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                    </li>
                    <li>
                        <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                    </li>
                    <li>
                        <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                    </li>
                    <li>
                        <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                    </li>
                    </ul>
                </div>
*/