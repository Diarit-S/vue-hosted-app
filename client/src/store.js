// jshint esversion:6

import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from './router';

Vue.use(Vuex);

const user = {
  namespaced: true,
  state: {
    data: {},
    isLoading: false,
    isLoggedIn: false,
    jwtToken: null,
    errors: []
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
    errors: state => state.errors,
    currentUser: state => state.data,
    jwtToken: state => state.jwtToken
  },
  actions: {
    trySignin(context, credentials) {},
    trySignup(context, user) {},
    fetchCurrentUser(context, user) {},
  },
  mutations: {
    signinSuccess(state, data) {},
    signupSuccess(state, data) {},
    signOut(state){},
    signError(state, errors){},
  }
};