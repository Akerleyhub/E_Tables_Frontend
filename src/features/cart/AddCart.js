/*
    Loads the menu from db. Also user can select items to add to cart for checkout. 
    They can also filter the menu to help find items quicker.
*/
import React,{useEffect, useState} from 'react';
//import testmenu from "../../menu_data.json";
import APIpage from '../../APIpage';

const AddCart=({addSelected})=>{
    //how to handle large data loading with useEffect
    const [itemArr,setItemArr] = useState([]);
    const [type,setType] = useState('*');


    //https://devtrium.com/posts/async-functions-useeffect
    useEffect(() => {
        async function loadMenu() {
            //const {businessid,tableid} = tableInfo;
            //just pass in tableInfo- obj that contains businessid,tableid,and date
            const tableInfo = localStorage.getItem('_table');
            //console.log(type);
            let table= await APIpage.getMenu(tableInfo,type);
            setItemArr(table);
        }
      
        // call the function
        loadMenu()
          // make sure to catch any error
          .catch(console.error);;
      }, [type]) //so when type is changed it will reload data: type

    

    return (
        <div className='container h-screen text-center'>
            <button onClick={() => setType('Appitizor')} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Apps</button>
            <button onClick={() => setType('Entree')} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Entrees</button>
            <button onClick={() => setType('Dessert')} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Desserts</button>
            <button onClick={() => setType('Non')} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Drinks</button>
            <button onClick={() => setType('Alcohol')} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Alc-Drinks</button>
            <ul class="grid gap-6 w-full md:grid-cols-3">
            {itemArr.map(i=>
                <li>
                    <div className='halg'>
                        <input type="checkbox" id={i.id} name="checkerbox" value={JSON.stringify(i)} class="hidden peer" required="" />
                        <label for={i.id} class="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                            <div class="block">
                            {/* Not sure how this is going to pan out but yolo */}
                                <a id={i.id}>
                                    <img class="rounded-t-lg w-80 h-80" src={i.itemimage} alt="" />
                                </a>
                                <div class="p-5">
                                    <a href="#">
                                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{i.name}</h5>
                                    </a>
                                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{i.description}</p>
                                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${i.cost}</p>
                                    
                                </div>
                            </div>
                        </label>
                    </div>
                </li>   
            )
            }
            </ul>
            <button type="button" onClick={() => addSelected()} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add to cart</button>
        </div>
    )
}

export default AddCart;

//OLD CODE
/*
          //document.getElementById(id).style.visibility = "hidden";
    //document.getElementById(id).style.visibility = "visible";
    //console.log(itemArr,'we in deep');
    // const hideElements=(ele)=>{
    //     let allBoxes = document.querySelectorAll('input[type=checkbox]');
    //     let allTangible = document.getElementsByClassName('halg'); //idk what halg means I just couldn't think of a word
    //     //let allBoxes = document.getElementsByClassName('halg')

    //     for(let x=0;x<allBoxes.length;x++){
    //         let jsn = allBoxes[x].value;
    //         let p =JSON.parse(jsn);
    //         //console.log(p.itemType)
    //         if(p.itemType !== ele){
    //             //allTangible[x].style.display = "none";
    //             allTangible[x].classList.add("hidden");
    //         }else{
    //             //allTangible[x].style.display = "contents";
    //             allTangible[x].classList.remove("hidden");
    //         }
    //     }
    //     setType(ele);
    // }

    // declare the async data fetching function due to loading issue
        // const loadMenu = async () => {
        //   // get the data from the API here
        //   let food = await testmenu.menu.foods;
        //   let drink = await testmenu.menu.drinks;
        //   let data = [...food,...drink];
        // //   if(type === 'Appitizor' || type === 'Entree' || type === 'Dessert'){
        // //     data = await testmenu.menu.foods;
        // //     data = data.filter((i)=> i.itemType == type);
        // //   }else if(type === 'Non' || type === 'Alcohol'){
        // //     data = await testmenu.menu.drinks;
        // //     data = data.filter((i)=> i.itemType == type);
        // //   }
        //   // set state with the result
        //   setItemArr(data);
        // }
*/