<template>
	<div id='menuAppContainer'>
    <v-btn flat to='/home'>
      <v-icon color='primary'>home</v-icon> &nbsp;
      <router-link to="home">{{$t('app.home')}}</router-link>
    </v-btn>
    <v-btn flat v-show='!user.auth' to='/login'>
      <v-icon color='primary'>lock</v-icon> &nbsp;
      <router-link to="/login">{{$t('app.login.title')}}</router-link>
    </v-btn>
    <v-btn flat v-show='!user.auth' to='/register'>
      <v-icon color='primary'>account_box</v-icon> &nbsp;
      <router-link to="/register">{{$t('app.register.title')}}</router-link>
    </v-btn>
      <!--insertlinkshere-->
  	</div>
</template>

<script>
  import {user,logout} from '../store/identity'

  export default {
    data: () => ({
      user,
    }),
  }
</script>

<style scoped>
  #menuAppContainer {
  	height: 100%;
  }
</style>