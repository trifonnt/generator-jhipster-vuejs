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
      <v-toolbar-title><img src="./assets/potatologo.png"/></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">

        <v-menu offset-y>
        <template v-slot:activator = '{on}'>
          <v-btn flat v-show='user.auth'
            color="primary"
            dark
            v-on = 'on'
          >
            <v-icon dark>notifications</v-icon>
          </v-btn>
        </template>
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
    <menu-app></menu-app>
    <v-menu offset-y>
    <template v-slot:activator = '{on}'>
      <v-btn flat v-show='user.auth'
        color="primary"
        dark
        v-on = 'on'
      >
        <v-icon color='primary'>view_list</v-icon> &nbsp;
        {{$t('app.entities')}}
        <v-icon dark>arrow_drop_down</v-icon>
      </v-btn>
    </template>
    <menu-up></menu-up>
  </v-menu>
  <v-menu offset-y>
    <template v-slot:activator = '{on}'>
      <v-btn flat v-show='user.auth'
        color="primary"
        dark
        v-on = 'on'
      >
        <v-icon color='primary'>view_list</v-icon> &nbsp;
        {{$t('app.entitiesx')}}
        <v-icon dark>arrow_drop_down</v-icon>
      </v-btn>
    </template>
    <menu-entitiesx></menu-entitiesx>
  </v-menu>
    <v-menu offset-y>
    <template v-slot:activator = '{on}'>
      <v-btn flat v-hasRole="'ROLE_ADMIN'" v-show='user.auth'
        color="primary"
        dark
        v-on = 'on'
      >
        <v-icon color='primary'>school</v-icon> &nbsp;
        {{$t('app.admin.admin')}}
        <v-icon dark>arrow_drop_down</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-tile>
        <v-icon color='primary'>account_box</v-icon> &nbsp;
        <v-list-tile-title><router-link to='/admin/userx'>{{$t('app.admin.user')}}</router-link></v-list-tile-title>
      </v-list-tile>

      <v-list-tile>
        <v-icon color='primary'>library_books</v-icon> &nbsp;
        <v-list-tile-title><router-link to='/admin/docs'>{{$t('app.admin.docs')}}</router-link></v-list-tile-title>
      </v-list-tile>

      <v-list-tile>
        <v-icon color='primary'>local_hospital</v-icon> &nbsp;
        <v-list-tile-title><router-link to='/admin/health'>{{$t('app.admin.health')}}</router-link></v-list-tile-title>
      </v-list-tile>

      <v-list-tile>
        <v-icon color='primary'>playlist_add_check</v-icon> &nbsp;
        <v-list-tile-title><router-link to='/admin/audit'>{{$t('app.admin.audit')}}</router-link></v-list-tile-title>
      </v-list-tile>
      <v-list-tile>
        <v-icon color='primary'>book</v-icon> &nbsp;
        <v-list-tile-title>
          <router-link to='/admin/logs'>{{$t('app.admin.logs')}}</router-link>
        </v-list-tile-title>
      </v-list-tile>

      <v-list-tile>
        <v-icon color='primary'>build</v-icon> &nbsp;
        <v-list-tile-title>
          <router-link to='/admin/config'>{{$t('app.admin.config')}}</router-link>
        </v-list-tile-title>
      </v-list-tile>

      <v-list-tile>
        <v-icon color='primary'>timeline</v-icon> &nbsp;
        <v-list-tile-title>
          <router-link to='/admin/metrics'>{{$t('app.admin.metrics')}}</router-link>
        </v-list-tile-title>
      </v-list-tile>

    </v-list>
  </v-menu>  
      <v-menu offset-y >
      <template v-slot:activator = '{on}'>
        <v-btn flat v-show='user.auth'
          color="primary"
          dark
          v-on = 'on'
        >
          {{$t('app.account.menu')}}
          <v-icon dark>arrow_drop_down</v-icon>
        </v-btn>
      </template>
      <v-list >
        <v-list-tile
          @click=""
        >
          <v-icon color='primary'>account_box</v-icon> &nbsp;
          <v-list-tile-title><router-link to='/account'>{{$t('app.account.login')}}</router-link></v-list-tile-title>
        </v-list-tile>        
        <v-list-tile
          @click=""
        >
          <v-icon color='primary'>lock</v-icon> &nbsp;
          <v-list-tile-title><router-link to='/changepass'>{{$t('app.account.password')}}</router-link></v-list-tile-title>
        </v-list-tile>        
        <v-list-tile
          @click=""
        >
          <v-icon color='primary'>power_settings_new</v-icon> &nbsp;
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
  import MenuApp from './views/MenuApp.vue'
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
      MenuApp,
      MenuEntitiesx,
    }
  }
</script>
