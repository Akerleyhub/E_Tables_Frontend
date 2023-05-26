/*
    Should be the only page cook uses. From here they can view,temp mark done, and mark orders pending.
    Orders get sent to waitstaff page after they're marked pending.
*/
import React,{useState,useEffect} from 'react';
import APIpage from './APIpage';

// LET. HIM. COOK.
const Cook=({socket})=>{
    const [itemArr,setItemArr] = useState([]);
    // This is for getting a useeffect rerender when something is completed
    const [dummyState, setDummyState] = useState(true);


    useEffect(() => {
        async function loadOrders() {
            let table= await APIpage.getOrders();
            setItemArr(table);
        }
      
        // call the function
        loadOrders()
          // make sure to catch any error
          .catch(console.error);
    }, [dummyState]);

    // On the event that a customer made an order. Refresh the page using dummy useEffect.
    socket.on("customer:startOrder", (arg) => {
        console.log('event refresh fired ! ! !');
        setDummyState(!dummyState);
    });
    // //console.log(itemArr);
    // Object.keys(itemArr).map(template_name => {
    //     console.log(template_name);
    //     itemArr[template_name].map(item => {
    //         console.log(item)
    //     })
    // })

    // Mark pending based off order number and refresh page after.
    async function markPending(order_num){
        order_num = {order_num};
        await APIpage.markPending(order_num);
        setDummyState(!dummyState);
    }

    // Was hoping to filter so cooks dont have drinks.
    const checkIfFood=(i)=>{
        if(i.foodordrink == 'food') return true;
        return false;
    }
    // This is gross. But it works :)
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
                                        <div className='font-bold m-6'>{item.name}</div>
                                        <div className=''>{item.itemtype}</div>
                                        <div className=''>{item.description}</div>
                                        <div class="block">
                                            <div class="mt-2">
                                                <label class="inline-flex items-center">
                                                <input type="checkbox" class="w-6 h-6 text-green-600 border-0 rounded-md focus:ring-0"  />
                                                {/* <span class="ml-2">Medium </span> */}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <button type="button" onClick={() => markPending(order_num)} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Mark Complete</button>
                        </div>
                    )
                    })
            }
            </ul>
        </div>
    );


}

export default Cook;