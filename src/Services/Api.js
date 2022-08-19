import axios from "axios";

const token = localStorage.getItem('call@token')

const Api = axios.create({
  baseURL: `${process.env.REACT_APP_API_API_URL}/api/`,
  headers: {
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*',
    'Authorization': `Bearer ${token}`
  }
});



export default Api
