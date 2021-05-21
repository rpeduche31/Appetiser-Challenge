import {AUTH_LOGIN,AUTH_VERIFY,AUTH_REGISTER} from '../../api/authApi'


const state = {
    authStateRegister: false,
    authStateVerify: false,
    authStateLogin: false
};

const getters = {
    authRegisterStatus: state => state.authStateRegister,
    authVerifyStatus: state => state.authStateVerify,
    authLoginStatus: state => state.authStateLogin
};

const authFunction =(token,type)=>{
    localStorage.clear()
    localStorage.setItem(`@auth:token`,`${type}-${token}`)
}

const actions = {
    async handleAuthRegister({
        commit
    }, params) {
        
        const response = await AUTH_REGISTER(params)
        
        commit('authRegister', response?.data?.message ? response?.data?.message : response?.data?.access_token && 'success');
        response?.data?.access_token ? authFunction(response?.data?.access_token,'register') : null

        
    },
    async handleAuthVerify({
        commit
    }, params) {
        const response = await AUTH_VERIFY(params)
        commit('authVerify', response?.data?.message ? response?.data?.message : response?.success && response);

    },
    async handleAuthLogin({
        commit
    }, params) {
        const response = await AUTH_LOGIN(params)
        
        commit('authLogin', response);
        response?.data?.access_token ? authFunction(response?.data?.access_token,'login') : null
    }


};

const mutations = {
    authRegister: (state, response) => (state.authStateRegister = response),
    authVerify: (state, response) => (state.authStateVerify = response),
    authLogin: (state, response) => (state.authStateLogin = response)
};


export default {state, getters, actions, mutations};
