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
        {{$t('app.close')}}
      </v-btn>
    </v-snackbar>
    <menu-left :miniVariant='miniVariant'></menu-left>
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
      scroll-off-screen
      :scroll-threshold='30'
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="changeLeftDrawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-toolbar-title><img src="./assets/01_logo.png"/></v-toolbar-title>
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

    <v-btn flat to='/home'><router-link to="home">{{$t('app.home')}}</router-link></v-btn>
    <v-btn flat v-show='!user.auth' to='/login'><router-link to="/login">{{$t('app.login.title')}}</router-link></v-btn>
    <v-btn flat v-show='!user.auth' to='/register'><router-link to="/register">{{$t('app.register.title')}}</router-link></v-btn>
    <v-menu offset-y v-show='user.auth'>
    <v-btn flat
      slot="activator"
      color="primary"
      dark
    >
      {{$t('app.entities')}}
      <v-icon dark>arrow_drop_down</v-icon>
    </v-btn>
    <menu-up></menu-up>
  </v-menu>
  <v-menu offset-y v-show='user.auth'>
    <v-btn flat
      slot="activator"
      color="primary"
      dark
    >
      {{$t('app.entitiesx')}}
      <v-icon dark>arrow_drop_down</v-icon>
    </v-btn>
    <menu-entitiesx></menu-entitiesx>
  </v-menu>
    <v-menu offset-y v-hasRole="'ROLE_ADMIN'" v-show='user.auth'>
    <v-btn flat
      slot="activator"
      color="primary"
      dark
    >
      {{$t('app.admin.admin')}}
      <v-icon dark>arrow_drop_down</v-icon>
    </v-btn>
    <v-list>
      <v-list-tile><v-list-tile-title><router-link to='/admin/userx'>{{$t('app.admin.user')}}</router-link></v-list-tile-title></v-list-tile>
      <v-list-tile><v-list-tile-title><router-link to='/admin/docs'>{{$t('app.admin.docs')}}</router-link></v-list-tile-title></v-list-tile>
    </v-list>
  </v-menu>  
      <v-menu offset-y v-show='user.auth'>
      <v-btn flat
        slot="activator"
        color="primary"
        dark
      >
        {{$t('app.account.menu')}}
        <v-icon dark>arrow_drop_down</v-icon>
      </v-btn>
      <v-list >
        <v-list-tile
          @click=""
        >
          <v-list-tile-title><router-link to='/account'>{{$t('app.account.login')}}</router-link></v-list-tile-title>
        </v-list-tile>        
        <v-list-tile
          @click=""
        >
          <v-list-tile-title><router-link to='/changepass'>{{$t('app.account.password')}}</router-link></v-list-tile-title>
        </v-list-tile>        
        <v-list-tile
          @click=""
        >
          <v-list-tile-title><a href='#' @click='logout'>{{$t('app.account.logout')}}</a></v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
          <v-btn flat @click.stop='rightDrawer=!rightDrawer' v-show='user.auth'
        color="primary"
      >
        <v-icon dark>messages</v-icon>
      </v-btn>
    </v-menu>
    </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
  import {user,logout} from './store/identity'
  import MenuLeft from './views/MenuLeft.vue'
  import MenuUp from './views/MenuUp.vue'
  import MenuEntitiesx from './views/MenuEntitiesx.vue'

  export default {
    name: 'App',
    methods: {
      logout() {
        logout();
        this.$router.push('/')
      },
      changeLeftDrawer() {
        this.$store.commit('changeLeftDrawer');
      },
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
    },
    components: {
      MenuLeft,
      MenuUp,
      MenuEntitiesx,
    }
  }
</script>
