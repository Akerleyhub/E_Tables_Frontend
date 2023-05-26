/*
    Prob worth deleting. Tanner said this was going to be from a wordpress page.
    Or at least to start it will be.
*/
import { useNavigate } from 'react-router-dom';;

const PaymentPackages=()=>{
    const navigate = useNavigate();

    const transfertoPay=(e)=>{
        e.preventDefault();
        navigate('/payjunk');
    }
    //md:container md:mx-auto 
    return (
        <div className='container h-screen grid grid-cols-2 grid-rows-5 content-center'>
            <div className="rounded bg-slate-700 border-solid font-bold m-8 row-span-3 grid place-items-center">
                <h1>Deal 1</h1>
                <h3>Costs $69.99!</h3>
                <ul>
                    <li>✅Includes 3 free tables</li>
                    <li>✅Perfect for small busniesses</li>
                    <li>✅Cheese Pizza</li>
                </ul>
                <button onClick = {transfertoPay} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                    Select Plan
                </button>
            </div>
            <div className="rounded bg-slate-700 border-solid font-bold m-8 row-span-3 grid place-items-center">
                <h1>Deal 2</h1>
                <h3>Costs $109.99!</h3>
                <ul>
                    <li>✅Includes 5 free tables</li>
                    <li>✅Perfect for large busniesses</li>
                    <li>✅Pepperoni Pizza</li>
                </ul>
                <button onClick = {transfertoPay} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                    Select Plan
                </button>
            </div>
        </div>
    )
}

export default PaymentPackages;