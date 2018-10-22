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
            <v-list-tile-title><router-link to="home">Home</router-link></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-group
        prepend-icon="list"
      >
        <v-list-tile slot="activator">
          <v-list-tile-title>Entities</v-list-tile-title>
        </v-list-tile>
        <!--insertlinkshere-->

      </v-list-group>
      <v-list-group
        prepend-icon="person"
      >
        <v-list-tile slot="activator">
          <v-list-tile-title>Account</router-link></v-list-tile-title>
        </v-list-tile>
        <v-list-tile v-show='user.auth'>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><router-link to='/account'>Settings</router-link></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-show='user.auth'>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><router-link to='/changepass'>Password</router-link></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-show='user.auth'>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><router-link to='/logout'>Logout</router-link></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-show='!user.auth'>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><router-link to='/register'>Register</router-link></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-show='!user.auth'>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><router-link to='/login'>Login</router-link></v-list-tile-title>
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
  computed: {
    leftDrawer: {
      get() {
        return this.drawer;
      },
      set() {
        
      }
    }
  },
  props: {
    miniVariant: Boolean,
    drawer: Boolean
  },

}
</script>

<style>
  
</style>