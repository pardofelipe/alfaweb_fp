import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'animate.css/animate.min.css'
import {getAuth, onAuthStateChanged} from 'firebase/auth'

const auth = getAuth()
Vue.config.productionTip = false
onAuthStateChanged(auth,()=>{
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
})