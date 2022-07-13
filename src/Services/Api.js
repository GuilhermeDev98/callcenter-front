import axios from "axios";

const token = localStorage.getItem('call@token')

const Api = axios.create({
    baseURL: 'http://localhost:8000/api/',
    headers: {
      'Accept': 'application/json',
      'Authorization' : `Bearer ${token}`
    }
});

axios.interceptors.request.use(() => console.log('ok'));


export default Api
