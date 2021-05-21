import VueRouter from 'vue-router'

import Login from '../pages/Login'
import Home from '../pages/Home'
import Registration from '../pages/Registration'
import Verification from '../pages/Verification'






const routes = [
    {
        path: '/login',
        name: "Login",
        component: Login
    },
    
     {
        path: '/',
        name: "Home",
        component: Home
    },
    {
        path: '/register',
        name: "Registration",
        component: Registration
    },
    {
        path: '/verification',
        name: "Verification",
        component: Verification
    }

]

const router = new VueRouter({
    mode:'history',

    routes 
  })
  


export default router
