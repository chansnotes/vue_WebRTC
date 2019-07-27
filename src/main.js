import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import adapter from 'webrtc-adapter';


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  adapter,
  render: h => h(App)
}).$mount('#app')
