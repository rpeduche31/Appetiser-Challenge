
import {apiCall} from './index';


export const AUTH_REGISTER = async (params) => {
    try{
        var formdata = new FormData();
        formdata.append("email", params.email);
        formdata.append("full_name", params.username);
        formdata.append("password", params.password);
        formdata.append("password_confirmation", params.confirmPassword);
      const call = await apiCall.post('/register',formdata) 
      return call.data
    }catch(err){
        return err?.response
    }
}

export const AUTH_VERIFY = async (params) => {
    const newData =  JSON.stringify({
        "token": params.token,
        "via": "email"
    })
    const getToken = await localStorage.getItem('@auth:token')
    const config ={
        headers: {
        'Authorization':`Bearer ${getToken.split('register-')[1]}`
        }
    }
    try{
      const call = await apiCall.post('/verification/verify',newData,config) 
      return call.data
    }catch(err){
        return err?.response
    }
}

export const AUTH_VERIFY_RESEND = async () => {
    const newData =  JSON.stringify({
        "via": 'email'
    })
    const getToken = await localStorage.getItem('@auth:token')
    const config ={
        headers: {
        'Authorization':`Bearer ${getToken.split('register-')[1]}`
        }
    }
    try{
      const call = await apiCall.post('/verification/resend',newData,config) 
      return call.data
    }catch(err){
        return err?.response
    }
}

export const AUTH_LOGIN = async (params) => {
    try{
        var formdata = new FormData();
        formdata.append('username', params.username);
        formdata.append('password', params.password);
      const call = await apiCall.post('/login',formdata) 
      return call.data
    }catch(err){
        return err?.response
    }
}

export const AUTH_LOGOUT = async (router) => {
    try{
      localStorage.clear()
      setTimeout(()=>{
        router.push('/login')
      },500)
    }catch(err){
        return err?.response
    }
}