// jshint esversion:6

import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "./router";

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
        const data = await axios.post("/api/auth", credentials);
        context.commit('signinSuccess', data);
        router.push('/profil')
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
      state.errors = null;
      state.isLoggedIn = true;
      state.data = data.user;
      state.jwtToken = data.jwtToken;
    },
    signupSuccess(state) {
      state.isLoading = false;
      state.errors = null;
    },
    signError(state, errors){
      console.log(errors);
      state.isLoading = false;
      state.errors = errors.response.data;
    },
    signOut(state){
      state.jwtToken = null;
    },
    fetchCurrentUserSuccess(state, user) {
      state.data = user;
      state.isLoading = false;
      state.errors = null;
    }
  }
};

const store = new Vuex.Store({
  modules: {
    user
  }
});

export default store;
