<template>
  <div class="card p-4 d-flex flex-column">
    <div>email : {{ currentUser.email }}</div>
    <div>username : {{ currentUser.username }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';


export default {
  name: 'Profil',
  computed: {
    ...mapGetters('user', ['currentUser'])
  }
}
</script>

<style>

</style>
