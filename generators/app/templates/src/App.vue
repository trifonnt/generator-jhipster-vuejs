<template>
  <v-app>
   <v-snackbar
      v-model="snackShow"
      :multi-line="true"
      :top="true"
      :color="snackColor"
    >
      {{ snackText }}

      <v-btn
        color="white"
        flat
        @click="snackShow = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    <v-navigation-drawer
      v-model="drawer"
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
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
          <v-list-tile-title><router-link to='entities/product'>Products</router-link></v-list-tile-title>
        </v-list-tile-content>
        </v-list-tile>        
                <v-list-group
          no-action
          sub-group
        >
          <v-list-tile slot="activator">
            <v-list-tile-title>Subgroup</v-list-tile-title>
          </v-list-tile>
           <v-list-tile>
            <v-list-tile-title>Subgroup</v-list-tile-title>
          </v-list-tile>
        </v-list-group>
      <v-list-tile>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
          <v-list-tile-title><router-link to='entities/vendor'>Vendors</router-link></v-list-tile-title>
        </v-list-tile-content>
        </v-list-tile>
      <v-list-tile>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
          <v-list-tile-title><router-link to='entities/vendorbid'>Vendor Bid</router-link></v-list-tile-title>
        </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
          <v-list-tile-title><router-link to='entities/vendorbidproducts'>Vendor Bid Products</router-link></v-list-tile-title>
        </v-list-tile-content>
        </v-list-tile>
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
    <v-navigation-drawer right fixed temporary v-model='rightDrawer'>
      

        <v-list two-line>
            <v-subheader
         
            >
              dasdas
            </v-subheader>

            <v-divider
              
       
            ></v-divider>

            <v-list-tile
         
              
              avatar
              @click=""
            >
              <v-list-tile-avatar>
                <img src="item.avatar">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title >dadadada</v-list-tile-title>
                <v-list-tile-sub-title >dadadada</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
                        <v-list-tile
         
              
              avatar
              @click=""
            >
              <v-list-tile-avatar>
                <img src="item.avatar">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title >dadadada</v-list-tile-title>
                <v-list-tile-sub-title >dadadada</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
                        <v-list-tile
         
              
              avatar
              @click=""
            >
              <v-list-tile-avatar>
                <img src="item.avatar">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title >dadadada</v-list-tile-title>
                <v-list-tile-sub-title >dadadada</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
        </v-list>


    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-toolbar-title>Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">

        <v-menu offset-y v-show='user.auth'>
      <v-btn flat
        slot="activator"
        color="primary"
        dark
      >
        <v-icon dark>notifications</v-icon>
      </v-btn>
        <v-list>
          <v-list-tile
            avatar
          >
            <v-list-tile-action>
              <v-icon color="pink">star</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>dasdas</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-avatar>
              <img src="item.avatar">
            </v-list-tile-avatar>
          </v-list-tile>
                    <v-list-tile
            avatar
          >
            <v-list-tile-action>
            
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>dasdas</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-avatar>
              <img src="item.avatar">
            </v-list-tile-avatar>
          </v-list-tile>
                    <v-list-tile
            avatar
          >
            <v-list-tile-action>
             
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>dasdas</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-avatar>
              <img src="item.avatar">
            </v-list-tile-avatar>
          </v-list-tile>
        </v-list>
    </v-menu>
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
      </v-list>
    </v-menu>
      <v-menu offset-y v-show='user.auth'>
      <v-btn flat
        slot="activator"
        color="primary"
        dark
      >
        Account
        <v-icon dark>arrow_drop_down</v-icon>
      </v-btn>
      <v-list >
        <v-list-tile
          @click=""
        >
          <v-list-tile-title><router-link to='/account'>Account</router-link></v-list-tile-title>
        </v-list-tile>        
        <v-list-tile
          @click=""
        >
          <v-list-tile-title><router-link to='/changepass'>Password</router-link></v-list-tile-title>
        </v-list-tile>        
        <v-list-tile
          @click=""
        >
          <v-list-tile-title><a href='#' @click='logout'>Logout</a></v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
          <v-btn flat @click.stop='rightDrawer=!rightDrawer'
        color="primary"
      >
        <v-icon dark>messages</v-icon>
      </v-btn>
    </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import {user,logout} from './store/identity'
  export default {
    name: 'App',
    methods: {
      logout() {
        logout();
        this.$router.push('/')
      }
    },
    data () {
      return {
        user,
        clipped: false,
        drawer: false,
        fixed: false,
        items: [{
          icon: 'bubble_chart',
          title: 'Inspire'
        }],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Vuetify.js'
      }
    },
    computed: {
      snackText() {
        return this.$store.state.app.snackText
      },
      snackShow: {
        get() {return this.$store.state.app.snackShow},
        set(val) {this.$store.dispatch('snackShowAction', {val: val})}
      },
      snackColor() {
        return this.$store.state.app.snackColor;
      }
    }
  }
</script>
