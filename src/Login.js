/*
    Login page, does login. getFormData function is in router. Have it set up to login with
    Email and password currently. Site wide I use username for most logic. Shouldn't matter.
*/
import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';


//Login form
const Login=({getFormData})=>{
    const navigate = useNavigate();
    const initialState = {
        email:'',
        password:''
    }
    //state for the inputs
    const [formText,setformText] = useState(initialState);

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
        getFormData(formText); //DISPATCH HERE INSTEAD?

        //sets the form back to empty and sends to jobs page
        setformText(initialState);
        navigate('/');
    }
    //w-2/5 is what it should be but it wont work no matter what I do
    return (
        <div className="h-screen text-center">
            <p className='font-bold text-white m-6'>Login </p>
            <form onSubmit = {handleSubmit} className="">
                <div className="mb-6">
                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                    <input type="email" name="email" id="email" value = {formText.email} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" placeholder="john.doe@company.com" required />
                </div> 
                <div className="mb-6">
                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
                    <input type="password" name="password" id="password" value = {formText.password} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" placeholder="•••••••••" required />
                </div> 
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
            <p className='text-white m-8'>Don't have an account? Sign up <a className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" href="/signup">here</a></p>
        </div>
    )
}

export default Login;

/*
<form className={classes.root} noValidate autoComplete="off" onSubmit = {handleSubmit}>
                <TextField id="outlined-basic" name="username"  label ="Username" value = {formText.username} variant="outlined" onChange={handleChange} /><br />
                <TextField id="outlined-password-input" type="password" name="password"  label ="Password" value = {formText.password} variant="outlined" onChange={handleChange} /><br />
                <button>Submit</button>
            </form>
*/
            