import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//import { renderMatches } from 'react-router-dom';

import SubPreviewMenu from './SubPreviewMenu';
import { viewMenu,deleteFoodItem, deleteDrinkItem } from './menuSlice';

//Only need to view this
export function PreviewMenu() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    //get menu, order it, view it
    const menu = useSelector(viewMenu);

    const foods = menu.menu.foods;
    const drinks = menu.menu.drinks;

    let appitizers = foods.filter(starter => starter.itemType === 'Appitizor');
    let entrees = foods.filter(main => main.itemType === 'Entree');
    let desserts = foods.filter(end => end.itemType === 'Dessert');

    let nonAlc = drinks.filter(na => na.itemType === 'Non');
    let alc = drinks.filter(a => a.itemType === 'Alcohol');

    //delete from state
    const remove=(id,type)=>{
        if(type === 'food'){
            dispatch(deleteFoodItem(id));
        }else if(type === 'drink'){
            dispatch(deleteDrinkItem(id));
        }
    }
    
    //makes a card for foods, then drinks
    return (
        <div className='container h-screen text-center'>
            <h1>Appitizors</h1>
            { <SubPreviewMenu itemArr={appitizers} remove={remove} /> }
            {/* Divider Line */}
            <div class="relative flex py-5 items-center">
                <div class="flex-grow border-t border-gray-400"></div>
                <span class="flex-shrink mx-4 text-gray-400">Separator</span>
                <div class="flex-grow border-t border-gray-400"></div>
            </div>
            {/* End */}
            <h1>Entrees</h1>
            { <SubPreviewMenu itemArr={entrees} remove={remove}/> }
            {/* Divider Line */}
            <div class="relative flex py-5 items-center">
                <div class="flex-grow border-t border-gray-400"></div>
                <span class="flex-shrink mx-4 text-gray-400">Separator</span>
                <div class="flex-grow border-t border-gray-400"></div>
            </div>
            {/* End */}
            <h1>Desserts</h1>
            { <SubPreviewMenu itemArr={desserts} remove={remove} /> }
            {/* Divider Line */}
            <div class="relative flex py-5 items-center">
                <div class="flex-grow border-t border-gray-400"></div>
                <span class="flex-shrink mx-4 text-gray-400">Separator</span>
                <div class="flex-grow border-t border-gray-400"></div>
            </div>
            {/* End */}

            <h1>Drinks</h1>
            { <SubPreviewMenu itemArr={nonAlc} remove={remove} /> }
            {/* Divider Line */}
            <div class="relative flex py-5 items-center">
                <div class="flex-grow border-t border-gray-400"></div>
                <span class="flex-shrink mx-4 text-gray-400">Separator</span>
                <div class="flex-grow border-t border-gray-400"></div>
            </div>
            {/* End */}
            <h1>Alc Drinks</h1>
            { <SubPreviewMenu itemArr={alc} remove={remove} /> }

            <button type="button" onClick={() => navigate('/menucreation')} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Back to menu</button>
        </div>
    )
}


/*
No catagory way of doing it:- doubt I'll come back to this way but ya never know
{drinks ? drinks.map(d=>
                <div id={d.id} class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <img class="rounded-t-lg  w-80 h-80" src={d.img} alt="" />
                    </a>
                    <div class="p-5">
                        <a href="#">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{d.name}</h5>
                        </a>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{d.description}</p>
                        <button type="button" onClick={() => remove(d.id,d.foodordrink)} class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">Remove</button>
                        <a href="#" class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            More Info
                            <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </a>
                    </div>
                </div>
            ):
            <h1>No drinks in menu yet</h1>
            }
*/