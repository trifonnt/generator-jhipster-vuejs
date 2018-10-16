<template>
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
  import {user,logout} from '../store/identity'
  export default {
    data: () => ({
      user,
    }),
  }
</script>

<style>
  

</style>