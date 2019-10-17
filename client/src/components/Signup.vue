<template>
  <div class="container d-flex flex-column p-3 justify-content-center align-items-center">
    <h1>Signup</h1>
    <form @submit.prevent="trySubmit" class="text-left" action="">
      <div class="form-group">
        <label for="">Email</label>
        <input class="form-control" v-model="form.email" type="email">
      </div>
      <div class="form-group">
        <label for="">Username</label>
        <input class="form-control" v-model="form.username" type="text">
      </div>
      <div class="form-group">
        <label for="">Password</label>
        <input class="form-control" v-model="form.password" type="password">
      </div>
      <button class="btn btn-primary" :class="{'disabled': isLoading}" type="submit">Envoyer</button>
      <ul v-if="formErrors.length">
        <li v-for="error in formErrors" :key="error" class="text-danger">{{error}}</li>
      </ul>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Signup',
  data(){
    return {
      form: {
        email: '',
        username: '',
        password: ''
      },
      formErrors: []
    }
  },
  computed: {
    ...mapGetters('user', ['isLoading', 'errors'])
  },
  watch: {
    errors(newValue) {
      this.formErrors = newValue;
    }
  },
  methods: {
    trySubmit() {
      if (this.isValid() && !this.isLoading) {
        this.$store.dispatch('user/trySignup', this.form)
        console.log(this.form);
      }
    },
    isValid() {
      this.formErrors = [];
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      if (!emailRegex.test(this.form.email)){
        this.formErrors.push('Email non valide');
      }
      return this.formErrors.length === 0;
    }
  }
}
</script>

<style>

</style>
