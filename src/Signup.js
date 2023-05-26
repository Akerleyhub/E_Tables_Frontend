/*
    Basic signup page for the CUSTOMER. signup function sends back to Router.
*/
import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';;


const Signup=({signup})=>{
    const navigate = useNavigate();

    const initialState = {
        username:'',
        firstname:'',
        lastname:'',
        //phone:'',
        email:'',
        password:'',
        confirm_password:'',
        type:'CUSTOMER'
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
    //captcha daycare
    //const SITE_KEY = "XXXXX";
    
    // useEffect(() => {
    // const loadScriptByURL = (id, url, callback) => {
    //     const isScriptExist = document.getElementById(id);
    
    //     if (!isScriptExist) {
    //     var script = document.createElement("script");
    //     script.type = "text/javascript";
    //     script.src = url;
    //     script.id = id;
    //     script.onload = function () {
    //         if (callback) callback();
    //     };
    //     document.body.appendChild(script);
    //     }
    
    //     if (isScriptExist && callback) callback();
    // }
    
    // load the script by passing the URL
    // loadScriptByURL("recaptcha-key", `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`, function () {
    //     console.log("Script loaded!");
    // });
    // }, []);

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(formText.password !== formText.confirm_password){
            alert("Your passwords do not match");
        }else{
            formText["type"] = 'CUSTOMER';
            signup(formText); 
            //sets the form back to empty and sends to home page
            setformText(initialState);
            navigate('/');
        }
        
        //!!!!! Ignore confirm_password !!!!!!
        // window.grecaptcha.ready(function() {
        //     window.grecaptcha.execute('6Ld6H48eAAAAAIon8-Kt_whQCE3YNHSDAUYQwHnU', {action: 'demo'})
        //         .then(function(token) {
        //             // this token will be passed together with your data
        //             //adding it to the data here
        //             formText["gtoken"] = token;
        //             signup(formText); //DISPATCH HERE INSTEAD?
        //             //sets the form back to empty and sends to jobs page
        //             setformText(initialState);
        //             navigate('/');
        //         });
        // });
    }
    
    return (
        <div className="h-screen text-center">
            <p style={{color:'white',fontWeight: 700}}>Sign Up</p>
            <form onSubmit = {handleSubmit} className="">
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Username</label>
                        <input type="text" id="username" name="username" value = {formText.username} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="SuperJohn11" required />
                    </div>
                    <div>
                        <label for="firstname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">First name</label>
                        <input type="text" id="firstname" name="firstname" value = {formText.firstname} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                    </div>
                    <div>
                        <label for="lastname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last name</label>
                        <input type="text" id="lastname" name="lastname" value = {formText.lastname} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required />
                    </div>
                    {/* <div>
                        <label for="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone number</label>
                        <input type="tel" id="phone" value = {formText.phone} name="phone" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-445-6789" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required />
                    </div> */}
                
                    <div>
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
                        <input type="email" id="email" value = {formText.email} name="email" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
                    </div> 
                    <div>
                        <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
                        <input type="password" id="password" value = {formText.password} name="password" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                    </div> 
                    <div>
                        <label for="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Confirm password</label>
                        <input type="password" id="confirm_password" value = {formText.confirm_password} name="confirm_password" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                    </div> 
                </div>
                <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                    <input id="remember" type="checkbox" value="" className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                    </div>
                    <label for="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </div>
    )
}

export default Signup;


/*
<form onSubmit = {handleSubmit} className={classes.root} noValidate autoComplete="off">
                <TextField id="outlined-basic" name="username"  label ="Username" value = {formText.username} variant="outlined" onChange={handleChange} /><br />
                <TextField id="outlined-password-input" type="password" name="password"  label ="Password" value = {formText.password} variant="outlined" onChange={handleChange} /><br />
                <TextField id="outlined-basic" name="firstName"  label ="First Name" value = {formText.firstName} variant="outlined" onChange={handleChange} /><br />
                <TextField id="outlined-basic" name="lastName"  label ="Last Name" value = {formText.lastName} variant="outlined" onChange={handleChange} /><br />
                <TextField id="outlined-basic" name="email"  label ="Email" value = {formText.email} variant="outlined" onChange={handleChange} /><br />

                <button>Submit</button>
            </form>
*/

