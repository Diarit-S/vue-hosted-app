<template>
  <div class="container d-flex flex-column p-3 justify-content-center align-items-center">
    <h1>Signup</h1>
    <form @submit.prevent="trySubmit" class="text-left" action="">
      <div class="form-group">
        <label for="">Email</label>
        <input class="form-control" v-model="form.eamil" type="email">
      </div>
      <div class="form-group">
        <label for="">Username</label>
        <input class="form-control" v-model="form.username" type="text">
      </div>
      <div class="form-group">
        <label for="">Password</label>
        <input class="form-control" v-model="form.password" type="password">
      </div>
      <button class="btn btn-primary" type="submit">Envoyer</button>
      <ul v-if="errors.length">
        <li v-for="error in errors" :key="error" class="text-danger">{{error}}</li>
      </ul>
    </form>
  </div>
</template>

<script>

export default {
  name: 'Signup',
  data(){
    return {
      form: {
        email: '',
        username: '',
        password: ''
      },
      errors: []
    }
  },
  components: {
  },
  methods: {
    trySubmit() {
      if (this.isValid()) {
        console.log(this.form);
      }
    },
    isValid() {
      return true;
    }
  }
}
</script>

<style>

</style>
