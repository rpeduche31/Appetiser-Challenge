import axios from 'axios';


const api = 'https://api.baseplate.appetiserdev.tech/api/v1/auth';



export const apiCall = axios.create({
    baseURL: api,
    headers: {
        'Accept': 'application/json', 
    'Content-Type': 'application/json', 
    
    }
});
