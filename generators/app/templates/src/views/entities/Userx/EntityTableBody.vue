<template>
  <tr  :class="{visible: visibleHeader}">
    <td><v-checkbox :value='isChecked' @change='updateChecked($event)' v-model='isChecked'></v-checkbox></td>
    <td><div class='label'></div></td>
      <td @click='visibleHeader = !visibleHeader' :class="{visible: visibleHeader}" class='text-xs-right' data-label='Login' v-text="items.item['login']"></td>
      
      <td @click='visibleHeader = !visibleHeader' :class="{visible: visibleHeader}" class='text-xs-right' data-label='First Name' v-text="items.item['firstName']"></td>
    
      <td @click='visibleHeader = !visibleHeader' :class="{visible: visibleHeader}" class='text-xs-right' data-label='Activated' v-text="items.item['activated']"></td>
    
      <td @click='visibleHeader = !visibleHeader' :class="{visible: visibleHeader}" class='text-xs-right' data-label='Authorities'>
        <v-chip small class='chipenum' label style='display: inline-block' v-for="val in items.item['authorities'].slice(0,2)" :key='val' color="primary" text-color="white">{{val}}</v-chip>
        <v-menu offset-y>
          <v-btn class='morechips'
            slot="activator"
            depressed
          >
            <v-icon>more_horiz</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile v-for="val2 in items.item['authorities'].slice(2)">
              <v-chip label color='primary'>{{val2}}</v-chip>
            </v-list-tile>
          </v-list>
        </v-menu>
      </td>
    
      <td @click='visibleHeader = !visibleHeader' :class="{visible: visibleHeader}" class='text-xs-right' data-label='Created By' v-text="items.item['createdBy']"></td>
    
      <td @click='visibleHeader = !visibleHeader' :class="{visible: visibleHeader}" class='text-xs-right' data-label='Created Date' v-text="items.item['createdDate']"></td>
    
      <td @click='visibleHeader = !visibleHeader' :class="{visible: visibleHeader}" class='text-xs-right' data-label='Email' v-text="items.item['email']"></td>
    
    
      <td @click='visibleHeader = !visibleHeader' :class="{visible: visibleHeader}" class='text-xs-right' data-label='Image Url' v-text="items.item['imageUrl']"></td>
    
      <td @click='visibleHeader = !visibleHeader' :class="{visible: visibleHeader}" class='text-xs-right' data-label='Lang Key'>{{langKeyHuman}}</td>
    
      <td @click='visibleHeader = !visibleHeader' :class="{visible: visibleHeader}" class='text-xs-right' data-label='Last Modified By' v-text="items.item['lastModifiedBy']"></td>
    
      <td @click='visibleHeader = !visibleHeader' :class="{visible: visibleHeader}" class='text-xs-right' data-label='Last Modified Date' v-text="items.item['lastModifiedDate']"></td>
    
      <td @click='visibleHeader = !visibleHeader' :class="{visible: visibleHeader}" class='text-xs-right' data-label='Last Name' v-text="items.item['lastName']"></td>
    
      <td class="justify-center layout px-0" :class="{visible: visibleHeader}">
          <router-link :to="{name: 'view'+storeName.charAt(0).toUpperCase() + storeName.slice(1), params:{id: items.item.id}}">
          <v-icon
            
          size='20px'
            class="mr-2"
            
          >remove_red_eye
          </v-icon>
          </router-link>
          <router-link :to="{name: 'edit'+storeName.charAt(0).toUpperCase() + storeName.slice(1), params:{id: items.item.id}}">
          <v-icon
          size='20px'
            
            class='mr-2'
          >
            edit
          </v-icon>
        </router-link>
        <a href='#'>
          <v-icon
          size='20px'
            class='mr-2'
            @click="deleteItem"
          >
            delete
          </v-icon>
        </a>
        <v-menu>
          <v-btn
            slot="activator"
            dark
            icon
          >
            <v-icon class='mr-2' color='rgba(0,0,0,.54)'>more_vert</v-icon>
          </v-btn>

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

  export default {
    data: () => ({
      visibleHeader: false,
    }),
    created() {
    },
    computed: {
      isChecked: {
        set: function() {

        },
        get: function() {
          return this.$store.getters.isChecked(this.items.item.id);
        },
      },
      langKeyHuman() {
        let key = this.items.item['langKey']
        if(key == 'en') return 'English'
        if(key == 'de') return 'Deutsch'
        if(key == 'bg') return 'Български'

      }
    },
    methods: {
      deleteItem() {
        this.$store.commit('deleteItem', this.items.item)
      },
      updateChecked(event) {
        let e = {value:this.items.item.id, checked: event!=null}
        this.$store.dispatch('updateChecked', e);
      },
    },
    props: {
      items: Object,
      headers: Array,
      storeName: String,
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
</style>