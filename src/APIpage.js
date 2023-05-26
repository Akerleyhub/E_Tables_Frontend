/*
    All communication to the backend via API is here. Note the url contains '/api' to backend @devops.
*/
import axios from "axios";

const BASE_API_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001/api";

//all the api backend requests
class APIpage {
    // User API calls ------------
    static async register(signupinfo) {
        const result = await axios.post(`${BASE_API_URL}/users`, signupinfo);
        return result.data;
    }

    static async adminregister(signupinfo) {
        let token = localStorage.getItem('_token');
        const result = await axios.post(`${BASE_API_URL}/users/adminregister?_token=${token}`, signupinfo);
        return result.data;
    }

    static async login(logininfo) {
        const result = await axios.post(`${BASE_API_URL}/auth/login`, logininfo);
        return result.data;
    }

    static async updateUser(userinfo) {
        let token = localStorage.getItem('_token');
        const result = await axios.patch(`${BASE_API_URL}/users/${userinfo.username}?_token=${token}`, userinfo);
        return result.data;
    }

    static async getUser(){
        let token = localStorage.getItem('_token')
        const result = await axios.get(`${BASE_API_URL}/users/singleuser?_token=${token}`);
        return result.data;
    }

    // Order API calls ------------
    static async getMenu(table,type) {
        let token = localStorage.getItem('_token');
        //console.log(typeof table,table) this was coming in as string which was annoying af to debug
        //string to object
        const tableObj = JSON.parse(table); 
        tableObj['filter'] = type.toUpperCase();
        //console.log(typeof tableObj,tableObj);
        const result = await axios.post(`${BASE_API_URL}/orders/getMenu?_token=${token}`, tableObj);
        return result.data;
    }

    static async addOrder(orders) {
        let token = localStorage.getItem('_token');
        const result = await axios.post(`${BASE_API_URL}/orders/addOrder?_token=${token}`, orders);
        return result.data;
    }

    static async orderHist() {
        let token = localStorage.getItem('_token');
        const result = await axios.get(`${BASE_API_URL}/users/orderhistory?_token=${token}`);
        return result.data;
    }

    static async getOrders(){
        let token = localStorage.getItem('_token');
        const result = await axios.get(`${BASE_API_URL}/orders/getOrders?_token=${token}`);
        return result.data;
    }

    static async getCookedOrders(){
        let token = localStorage.getItem('_token');
        const result = await axios.get(`${BASE_API_URL}/orders/getCookedOrders?_token=${token}`);
        return result.data;
    }

    static async markPending(order){
        let token = localStorage.getItem('_token');

        const result = await axios.post(`${BASE_API_URL}/orders/markPending?_token=${token}`,order);
        return result.data;
    }

    static async markComplete(order){
        let token = localStorage.getItem('_token');
        const result = await axios.post(`${BASE_API_URL}/orders/markComplete?_token=${token}`,order);
        return result.data;
    }

    // static async addOrderItems(orderitems) {
    //     let token = localStorage.getItem('_token');
    //     const result = await axios.post(`${BASE_API_URL}/orders/addOrderItems?_token=${token}`, orderitems);
    //     return result.data;
    // }

    // static async getQR(){
    //     let token = localStorage.getItem('_token');
    //     const result = await axios.get(`${BASE_API_URL}/orders/getQRcode?_token=${token}`);
    //     //console.log(result.data);
    //     return result.data;
    // }

    // static async getQRCodeEmail(){
    //     let token = localStorage.getItem('_token');
    //     await axios.post(`${BASE_API_URL}/orders/sendQRemail?_token=${token}`);
    //     return null;
    // }

    // static async markDone(vals){
    //     let token = localStorage.getItem('_token');
    //     const result = await axios.patch(`${BASE_API_URL}/orders/finishorder?_token=${token}`, vals);
    //     return result.data;
    // }

}

export default APIpage;
