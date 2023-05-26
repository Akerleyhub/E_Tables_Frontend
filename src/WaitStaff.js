/*
    This logic is exactly the same as Cook.js. In the future we should combine these somehow.
    Note: they call different API methods
*/
import React,{useState,useEffect} from 'react';
import APIpage from './APIpage';


const WaitStaff=({socket})=>{
    const [itemArr,setItemArr] = useState([]);
    const [dummyState, setDummyState] = useState(true);


    useEffect(() => {
        async function loadOrders() {
            let table= await APIpage.getCookedOrders();
            setItemArr(table);
        }
      
        loadOrders()
          .catch(console.error);
      }, [dummyState]);

    socket.on("cook:markPending", (arg) => {
        setDummyState(!dummyState);
    });

    async function markComplete(order_num){
        order_num = {order_num};
        await APIpage.markComplete(order_num);
        setDummyState(!dummyState);
    }

    return (
        <div className='container h-screen text-center'>
            <ul class="grid gap-6 w-full md:grid-cols-3">
            {
                Object.keys(itemArr).map(order_num => {
                    return (
                        <div className='border-2 border-sky-500'>
                        <h1 className='font-bold underline m-6'>Order #{order_num}</h1>
                        {
                            itemArr[order_num].map(item => {
                                return(
                                    <div>
                                        <div className='font-bold m-6'>Location:{item.fk_locationid}</div>
                                        <div className='font-bold m-6'>{item.name}</div>
                                        <div className=''>{item.itemtype}</div>
                                        <div className=''>{item.description}</div>
                                        <div class="block">
                                            <div class="mt-2">
                                                <label class="inline-flex items-center">
                                                <input type="checkbox" class="w-6 h-6 text-green-600 border-0 rounded-md focus:ring-0"  />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <button type="button" onClick={() => markComplete(order_num)} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Mark Complete</button>
                        </div>
                    )
                    })
            }
            </ul>
        </div>
    );


}

export default WaitStaff;