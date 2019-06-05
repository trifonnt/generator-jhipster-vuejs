<template>
	<tr :class="{visible: visibleHeader}">
	  <td><v-checkbox :value='isChecked' @change='updateChecked($event)' v-model='isChecked'></v-checkbox></td>
    <td><div class='label'></div></td>
      <td v-show='hideName!="login" && true' v-hasRole="'ROLE_USER,ROLE_ADMIN'" @click='visibleHeader = !visibleHeader' :class="{visible: visibleHeader}" class='text-xs-center' :data-label='$t("userx.newappApp.userx.login")' v-text="items.item['login']"></td>

      <td v-show='hideName!="firstName" && true' v-hasRole="'ROLE_USER,ROLE_ADMIN'" @click='visibleHeader = !visibleHeader' :class="{visible: visibleHeader}" class='text-xs-center' :data-label='$t("userx.newappApp.userx.firstName")' v-text="items.item['firstName']"></td>

      <td v-show='hideName!="lastName" && true' v-hasRole="'ROLE_USER,ROLE_ADMIN'" @click='visibleHeader = !visibleHeader' :class="{visible: visibleHeader}" class='text-xs-center' :data-label='$t("userx.newappApp.userx.lastName")' v-text="items.item['lastName']"></td>

      <td v-show='hideName!="email" && true' v-hasRole="'ROLE_USER,ROLE_ADMIN'" @click='visibleHeader = !visibleHeader' :class="{visible: visibleHeader}" class='text-xs-center' :data-label='$t("userx.newappApp.userx.email")' v-text="items.item['email']"></td>

      <td v-show='hideName!="activated" && true' v-hasRole="'ROLE_USER,ROLE_ADMIN'" @click='visibleHeader = !visibleHeader' :class="{visible: visibleHeader}" class='text-xs-center' :data-label='$t("userx.newappApp.userx.activated")' v-text="items.item['activated']"></td>

      <td v-if="items.item['authorities'] && items.item['authorities'].length" v-show='hideName!="authorities" && true' v-hasRole="'ROLE_USER,ROLE_ADMIN'" @click='visibleHeader = !visibleHeader' :class="{visible: visibleHeader}" class='text-xs-center' :data-label='$t("userx.newappApp.userx.authorities")'>
        <v-chip v-for="val in items.item['authorities'].slice(0,2)" :key='val' color="primary" text-color="white">{{val}}</v-chip>
        <v-menu offset-y>
          <template v-slot:activator = '{on}'>
            <v-chip color='primary' class='morechips' v-show="items.item['authorities'] && items.item['authorities'].length > 2"
              style='padding: 0;'
              outline
              v-on = 'on'
            >
              <v-icon>more_vert</v-icon>
            </v-chip>
          </template>
          <v-list>
            <v-list-tile v-for="val2 in items.item['authorities'].slice(2)" :key='val2'>
              <v-chip color='primary' class='white--text'>{{val2}}</v-chip>
            </v-list-tile>
          </v-list>
        </v-menu>
      </td>

<!--       <td v-if="items.item['langKeys'] && items.item['langKeys'].length" v-show='hideName!="langKey" && true' v-hasRole="'ROLE_USER,ROLE_ADMIN'" @click='visibleHeader = !visibleHeader' :class="{visible: visibleHeader}" class='text-xs-center' :data-label='$t("userx.newappApp.userx.langKey")'>
        <v-chip v-for="val in items.item['langKey'].slice(0,2)" :key='val' color="primary" text-color="white">{{val}}</v-chip>
        <v-menu offset-y>
          <v-chip color='primary' class='morechips' v-show="items.item['langKey'] && items.item['langKey'].length > 2"
            style='padding: 0;'
            slot="activator"
            outline
          >
            <v-icon>more_vert</v-icon>
          </v-chip>
          <v-list>
            <v-list-tile v-for="val2 in items.item['langKey'].slice(2)" :key='val2'>
              <v-chip color='primary' class='white--text'>{{val2}}</v-chip>
            </v-list-tile>
          </v-list>
        </v-menu>
      </td> -->
      
      <td v-show='hideName!="langKey" && true' v-if="!items.item['langKeys'] || items.item['langKeys'].length == 0"></td>

      <td v-show='hideName!="imageUrl" && true' v-hasRole="'ROLE_USER,ROLE_ADMIN'" @click='visibleHeader = !visibleHeader' :class="{visible: visibleHeader}" class='text-xs-center' :data-label='$t("userx.newappApp.userx.imageUrl")' v-text="items.item['imageUrl']"></td>

      <td v-show='hideName!="createdBy" && false' v-hasRole="'ROLE_USER,ROLE_ADMIN'" @click='visibleHeader = !visibleHeader' :class="{visible: visibleHeader}" class='text-xs-center' :data-label='$t("userx.newappApp.userx.createdBy")' v-text="items.item['createdBy']"></td>

      <td v-show='hideName!="createdDate" && false' v-hasRole="'ROLE_USER,ROLE_ADMIN'" @click='visibleHeader = !visibleHeader' :class="{visible: visibleHeader}" class='text-xs-center' :data-label='$t("userx.newappApp.userx.createdDate")' v-text="items.item['createdDate']"></td>
      
<!--       <td v-show='hideName!="authorities" && true' v-if="!items.item['authorities'] || items.item['authorities'].length == 0"></td> -->

      <td v-show='hideName!="lastModifiedBy" && false' v-hasRole="'ROLE_USER,ROLE_ADMIN'" @click='visibleHeader = !visibleHeader' :class="{visible: visibleHeader}" class='text-xs-center' :data-label='$t("userx.newappApp.userx.lastModifiedBy")' v-text="items.item['lastModifiedBy']"></td>

      <td v-show='hideName!="lastModifiedDate" && false' v-hasRole="'ROLE_USER,ROLE_ADMIN'" @click='visibleHeader = !visibleHeader' :class="{visible: visibleHeader}" class='text-xs-center' :data-label='$t("userx.newappApp.userx.lastModifiedDate")' v-text="items.item['lastModifiedDate']"></td>



      <td class="justify-center layout px-0" :class="{visible: visibleHeader}">
          <router-link :to="{name: 'view'+storeName.charAt(0).toUpperCase() + storeName.slice(1), params:{id: items.item.id}}">
          <v-icon
            
          size='20px'
            class="mr-2"
            
          >remove_red_eye
          </v-icon>
          </router-link>
          <router-link v-show='!hideName' :to="{name: 'edit'+storeName.charAt(0).toUpperCase() + storeName.slice(1), params:{id: items.item.id, masterId: $route.params.masterId}}">
          <v-icon
          size='20px'
            
            class='mr-2'
          >
            edit
          </v-icon>
        </router-link>
        <router-link v-show='hideName' :to="{name: 'edit'+storeName.charAt(0).toUpperCase() + storeName.slice(1), params:{id: items.item.id, masterId: $route.params.masterId, hideName: hideName}}">
          <v-icon
          size='20px'
            
            class='mr-2'
          >
            edit
          </v-icon>
        </router-link>
        <a href='#'>
          <v-icon style='margin-right: 0 !important;'
          size='20px'
            class='mr-2'
            @click="deleteItem"
          >
            delete
          </v-icon>
        </a>
        <v-menu style='margin-left: 0;'>
          <template v-slot:activator = '{on}'>
            <v-btn style='margin-left: 0;'
              dark
              icon
              v-on = 'on'
            >
              <a href='#'> <v-icon size='20px' class='mr-2' color='rgba(0,0,0,.54)'>more_vert</v-icon> </a>
            </v-btn>
          </template>
          <v-list>
            <v-list-tile>
              <v-list-tile-title>Action</v-list-tile-title>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-title>Action</v-list-tile-title>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-title>Action</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </td>
      </tr>
</template>

<script>
  import {createStore} from '../../../storex/'

  import Gallery from '../../common/Gallery.vue'

  let store = require('../../../store/userx').default;
  let getFiles = store.getFiles;

  let vueObj = {};
  vueObj.computed = {
    isChecked: {
      set: function() {

      },
      get: function() {
        return this.$store.getters.isChecked(this.items.item.id);
      },
    }
  };

  vueObj.methods = {      
    deleteItem() {
      this.$store.commit('deleteItem', this.items.item)
    },
    updateChecked(event) {
      let e = {value:this.items.item.id, checked: event!=null}
      this.$store.dispatch('updateChecked', e);
    },
  };


  try {
    let extend = require('./EntityTableBodyFunctionsX')
    vueObj.data && Object.assign(vueObj.data, extend.data)
    vueObj.methods && Object.assign(vueObj.methods, extend.methods)
    vueObj.computed && Object.assign(vueObj.computed, extend.computed)
  } catch(err) {
    console.log(err)
  }

	export default {
		data: () => ({
    	visibleHeader: false,
    }),
    created() {
    },
    computed: vueObj.computed,
		methods: vueObj.methods,
		props: {
			items: Object,
			headers: Array,
      storeName: String,
      hideName: {
        type: String,
        default: '',
      },
		},
    components: {
      Gallery,
    },

	}
</script>

<style scoped>
  .label {
    width: 7px;
    height: 30px;
    background: red;
  }
  .chipenum {
    font-size: 10px;
  }
  .morechips {
    height: 32px;
  }
  >>>.v-list {
    max-height: 200px;
    overflow: scroll;
  }
  .v-menu > >>>.v-chip__content {
    padding: 0;
  }
</style>