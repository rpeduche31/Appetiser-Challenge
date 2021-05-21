import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import VueTilt from 'vue-tilt.js'
import stores from './stores'

// import 'vue-material/dist/theme/default-dark.css'
Vue.use(VueRouter);
Vue.use(VueMaterial)
Vue.use(VueTilt)






Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store:stores,
  render: h => h(App)
}).$mount('#app')


