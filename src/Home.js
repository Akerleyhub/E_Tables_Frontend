/*
    Idk this is the homepage so far. Not sure what we should have here if someone gets here somehow.
*/
import logo from './pics/logo.png';


const Home=()=>{
    return (
        <div className="h-screen text-center">
            <h1 className="text-2xl font-semibold">Welcome to E-Tables</h1>
            <img className="w-1/6 h-1/6 mx-auto" src={logo} />
            <p className='text-xl'>E-tables is your service for a better business</p>
            <br/>
            <ol>
                <li>1. Direct seat mapping with QR or rfid</li>
                <li>2. Analytics to improve service prep efficiency</li>
                <li>3. Ease of setup aka time to go live for customers</li>
                <li>4. No need for app</li>
            </ol>
        </div>
    )
}

export default Home