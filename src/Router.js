/*
    This is the routing page, pretty straight forward to what it does. Login logic comes back to here. 
    Also handles socketio connections.
*/

import React,{useState} from 'react';
import {BrowserRouter,Route, Routes, Navigate} from 'react-router-dom';
import Home from './Home';
import Signup from './Signup';
import EmployeeSignup from './EmployeeSignup';
import Login from './Login';
import PaymentPackages from './PaymentPackages';
import NewBusiness from './NewBusiness';
import Location from './features/cart/Location';
import OrderSuccess from './OrderSuccess';
import OrderHistory from './OrderHistory';
import Cook from './Cook';
import WaitStaff from './WaitStaff';

import APIpage from './APIpage';
import BusinessNavbar from './BusinessNavbar';
import UserNavbar from './UserNavbar';
import MenuCreation from './features/menu/MenuCreation';
import { PreviewMenu } from './features/menu/PreviewMenu';
import Checkout from './features/cart/Checkout';


const Router=()=>{
    //const [userinfo,setUserinfo] = useState({});
    const getFormData=(logobj)=>{
        //prob add a try catch for all asyncness
        async function login(logobj) {
          const {email,password} = logobj;
          let obj = {email:`${email}`,password:`${password}`}
          let log= await APIpage.login(obj);
          localStorage.setItem('_token', log.token);
          //setUserinfo(email);
          return log;
        }
        login(logobj);
    }
    async function signup(logobj) {
        //let {email} = logobj;
        //google capcha for user auth, sending this and the signup data to backend
        var reg= await APIpage.register(logobj);
        localStorage.setItem('_token', reg.token);
        //setUserinfo(email);
        console.log('Succuessfully added userrrr');
        
        return 0;
    }
    //need a special signup for admin so we can use proper middleware
    async function adminsignup(logobj) {
        var reg= await APIpage.adminregister(logobj);
        console.log('Succuessfully added userrrr');
        //alert('New user added');
    }

    //socketio client side logic
    const { io } = require("socket.io-client");
    // const socket = io("http://localhost:3001");

    let t = localStorage.getItem('_token');
    // plain object
    const socket = io("http://localhost:3001",{
        auth: {
        token: t
        }
    });

    // const cookSocket = io("http://localhost:3001/cook"); // the "login" namespace
    // cookSocket.on("connect", () => {
    //     console.log("Now we're cookin"); // x8WIv7-mJelg7on_ALbx
    // });
    // const customerSocket = io("http://localhost:3001/customer"); 
    // customerSocket.on("connect", () => {
    //     console.log("Now we're a customer!",customerSocket.id);
    // });

    socket.on("connect", () => {
        console.log('connected to basic connection:',socket.id);
    });
    socket.on("disconnect", () => {
        console.log(socket.id); // undefined
    });
  

    // let token = localStorage.getItem('_token') || null;
    // let { type } = jwt.decode(token) || null;
    // const userType = type || 'CUSTOMER';
    // Still need to figure this part out
    const userType = 'CUSTOMER';
    return (
        <div>
            <BrowserRouter>
                {userType==='CUSTOMER' ? <UserNavbar /> : <BusinessNavbar />}
                <Routes>
                    <Route path='/' element={<Home/>} />
                    <Route path='/login' element={<Login getFormData={getFormData} />} />
                    <Route path='/signup' element={<Signup signup={signup} />} />
                    <Route path='/esignup' element={<EmployeeSignup adminsignup={adminsignup} />} />
                    <Route path='/paypackages' element={<PaymentPackages/>} />
                    <Route path='/newbusiness' element={<NewBusiness/>} />
                    <Route path='/menucreation' element={<MenuCreation/>} />
                    <Route path='/viewmenu' element={<PreviewMenu />} />
                    <Route path="/table/:businessid/:tableid" element={<Location />} />
                    <Route path='/checkout' element={<Checkout />} />
                    <Route path='/ordersuccess' element={<OrderSuccess />} />
                    <Route path='/orderhistory' element={<OrderHistory />} />
                    <Route path='/cook' element={<Cook socket={socket} />} />
                    <Route path='/waitstaff' element={<WaitStaff socket={socket} />} />

                    <Route
                        path="/redirect"
                        element={ <Navigate to="/error-page" /> }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Router;