/*
    Top most element. When the customer scans the QRCode they're sent to the site.
    Here the location and meta data is set in local storage. Locationid,businessid, date:- in '_table'.
    Qrcode would look like -> localhost:3000/tables/<businessID>/<tableID>

    Location -> Makeorder ->Addcart 
*/
import React,{ useEffect } from "react";
import MakeOrder from "./MakeOrder";
import {
  Link,
  useParams
} from "react-router-dom";


const Location=()=>{
    // We can use the `useParams` hook here to access the dynamic pieces of the URL.
    
    const { businessid,tableid } = useParams(); 
    //setTableData(tableid);

    //clear out local storage in case previous place is still saved
    if(localStorage.getItem('_table')) localStorage.removeItem('_table');
    //DATE
    const date = new Date(); //example: Fri Jun 17 2022 11:27:28 GMT+0100 (British Summer Time)
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${month}/${day}/${year}`;

    //set this as a local storage right at the start, that way we can grab it easy at checkout.
    let locationData = JSON.stringify({tableid,currentDate,businessid});
    localStorage.setItem('_table', locationData);


    return (
        <div className="container h-screen text-center">
            <h1> { locationData } </h1>
            <MakeOrder />
        </div>
    )
}

export default Location;