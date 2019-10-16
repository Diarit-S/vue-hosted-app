// jshint esversion:6

import Vue from 'vue';
import VueRouter from 'vue-router';


import Home from './components/Home.vue';
import Profil from './components/Profil.vue';
import Signin from './components/Signin.vue';
import Signup from './components/Signup.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {path: '/', component: Home},
    {path: '/profil', component: Profil},
    {path: '/signin', component: Signin},
    {path: '/signup', component: Signup}
  ]
});

export default router;
