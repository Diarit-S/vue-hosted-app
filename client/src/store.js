// jshint esversion:6

import Vue from "vue";
import Vuex from "vuex";
import axios from "./http";
import router from "./router";

Vue.use(Vuex);

const user = {
  namespaced: true,
  state: {
    data: {},
    isLoading: false,
    isLoggedIn: false,
    jwtToken: (localStorage.getItem("jwtToken") ? localStorage.getItem("jwtToken") : null),
    errors: []
  },
  getters: {
    isLoading: state => state.isLoading,
    isLoggedIn: state => state.isLoggedIn,
    errors: state => state.errors,
    currentUser: state => state.data,
    jwtToken: state => state.jwtToken
  },
  actions: {
    async trySignin(context, credentials) {
      try {
        context.commit('updateIsLoading', true);
        const response = await axios.post("/api/auth", credentials);
        context.commit('signinSuccess', response.data);
        router.push('/profil');
      } catch (e) {
        context.commit('signError', e);
      }
    },
    async trySignup(context, user) {
      try {
        context.commit('updateIsLoading', true);
        await axios.post("/api/user", user);
        context.commit('signupSuccess');
        router.push("/signin");
      } catch (e) {
        context.commit("signError", e);
      }
    },
    async fetchCurrentUser(context) {
      try {
        context.commit('updateIsLoading', true);
        const user = await axios.get('/api/user/current');
        context.commit('fetchCurrentUserSuccess', user);
      } catch (err) {
        context.commit('signError', err)
      }
    },
  },
  mutations: {
    updateIsLoading(state, isLoading){
      state.isLoading = isLoading;
    },
    signinSuccess(state, data) {
      state.isLoading = false;
      state.errors = [];
      state.isLoggedIn = true;
      state.data = data.user;
      state.jwtToken = data.jwtToken;
      localStorage.setItem('jwtToken', data.jwtToken)
    },
    signupSuccess(state) {
      state.isLoading = false;
      state.errors = [];
    },
    signError(state, errors){
      state.isLoading = false;
      state.errors = errors.response.data;
    },
    signOut(state){
      state.jwtToken = null;
    },
    fetchCurrentUserSuccess(state, user) {
      state.data = user;
      state.isLoading = false;
      state.errors = [];
    }
  }
};

const store = new Vuex.Store({
  modules: {
    user
  }
});

export default store;
