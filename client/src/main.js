// jshint esversion:6

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './http';
import store from './store';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
