<template>
    <v-navigation-drawer
      v-model="leftDrawer"
      app
      :mini-variant = "miniVariant"
    >
      <v-list>
        <v-list-tile
          value="true"
        >
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><router-link to="home">{{$t('app.home')}}</router-link></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-group v-show='user.auth'
        prepend-icon="list"
      >
        <v-list-tile slot="activator">
          <v-list-tile-title>{{$t('app.entities')}}</v-list-tile-title>
        </v-list-tile>
        <!--insertlinkshere-->

      </v-list-group>
      <v-list-group v-hasRole="'ROLE_ADMIN'" v-show='user.auth'
        prepend-icon="list"
      >
        <v-list-tile slot="activator">
          <v-list-tile-title>{{$t('app.admin.admin')}}</v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>user</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><router-link to='/admin/userx'>{{$t('app.admin.user')}}</router-link></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-show='user.auth'>
          <v-list-tile-action>
            <v-icon>user</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><router-link to='/admin/docs'>{{$t('app.admin.docs')}}</router-link></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>


      </v-list-group>
      <v-list-group
        prepend-icon="person"
      >
        <v-list-tile slot="activator">
          <v-list-tile-title>{{$t('app.account.menu')}}</router-link></v-list-tile-title>
        </v-list-tile>
        <v-list-tile v-show='user.auth'>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><router-link to='/account'>{{$t('app.account.password')}}</router-link></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-show='user.auth'>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><router-link to='/changepass'>{{$t('app.account.password')}}</router-link></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-show='user.auth'>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><router-link to='/logout'>{{$t('app.account.logout')}}</router-link></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-show='!user.auth'>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><router-link to='/register'>{{$t('app.register.title')}}</router-link></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-show='!user.auth'>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><a href='#' @click='logout'>{{$t('app.login.title')}}</a></router-link></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
import {user,logout} from '../store/identity'

export default {
  data: () => ({
    user,
  }),
  methods: {
    logout() {
      logout();
      this.$router.push('#')
      this.$router.push('/')
    },
  },
  computed: {
    leftDrawer: {
      get() {
        return this.$store.state.app.leftDrawer;
      },
      set(val) {
        this.$store.commit('setLeftDrawer', val)
      }
    }
  },
  props: {
    miniVariant: Boolean,
  },

}
</script>

<style>
  
</style>