// jshint esversion:6

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './http';

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
