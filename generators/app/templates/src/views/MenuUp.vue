<template>
  <v-btn flat><router-link to="home">Home</router-link></v-btn>
  <v-btn flat v-show='!user.auth'><router-link to="/login">Login</router-link></v-btn>
  <v-btn flat v-show='!user.auth'><router-link to="/register">Register</router-link></v-btn>
  <v-menu offset-y v-show='user.auth'>
  <v-btn flat
    slot="activator"
    color="primary"
    dark
  >
    Entities
    <v-icon dark>arrow_drop_down</v-icon>
  </v-btn>
  <v-list>
    <v-list-tile>
      <v-list-tile-title><router-link to='/entities/product'>Products</router-link></v-list-tile-title>
    </v-list-tile>        
      
      <v-list-tile><v-list-tile-title><router-link to='/entities/vendor'>Vendors</router-link></v-list-tile-title></v-list-tile>
      <v-list-tile><v-list-tile-title><router-link to='/entities/vendorbid'>Vendor Bid</router-link></v-list-tile-title></v-list-tile>
      <v-list-tile><v-list-tile-title><router-link to='/entities/vendorbidproducts'>Vendor Bid + Products</router-link></v-list-tile-title></v-list-tile>
      <!--insertlinkshere-->
  </v-list>
</template>

<script>
  import {user,logout} from './store/identity'
  export default {
    data: () => ({
      user,
    }),
  }
</script>

<style>
  

</style>