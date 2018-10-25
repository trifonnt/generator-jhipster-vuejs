<template>
	<tr  :class="{visible: visibleHeader}">
	  <td><v-checkbox :value='isChecked' @change='updateChecked($event)' v-model='isChecked'></v-checkbox></td>
    <td><div class='label'></div></td>
    <td @click='visibleHeader = !visibleHeader' :class="{visible: visibleHeader}" class='text-xs-right' :data-label='header.text' v-text="items.item[header.value]" v-for='header in headers.slice(0,-1)'></td>

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
      </td>
      </tr>
</template>

<script>
  import {createStore} from '../../storex/'

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
</style>