<template>
	<v-dialog v-model="dialog" max-width="500px">
		<v-card>
		  <v-card-title>
		    <span class="headline">Do you really want to delete item {{deletedItem.id}}? </span>
		  </v-card-title>

		  <v-card-actions>
		    <v-spacer></v-spacer>
		    <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
		    <v-btn color="blue darken-1" flat @click.native="deleted">Delete</v-btn>
		  </v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
	let store;
	let deleteItemById;
	import {createStore} from '../../../storex/'


	let vueObj = {};
	vueObj.methods = {
		close() {
		    this.$store.commit('changeDialog', false)
		},
		async deleted() {
			console.log("HERE")
	        this.$store.commit('changeDialog', false)
	        try {
        		console.log("HERE2")
	       		let res = await deleteItemById(this.deletedItem.id);
					this.$store.dispatch('snackShowAction', {text: this.$t('userx.newappApp.userx.deleted', {id: this.deletedItem.id}), val: true, color: "success"})
	        }
	        catch(err) {
	          this.$store.commit('snackShow', {text: res.title, val: true})
	          console.log(err, "ERROR")
	        }
	        this.$store.dispatch('changePaginationWatcher', {page:1})
	    },
	};
	vueObj.computed = {
		deletedItem() {
		  return this.$store.state.table.entity.deletedItem;
		},
	    dialog() {
	      return this.$store.state.table.entity.dialog;
	    }
	};

    try {
      let extend = require('./DeleteDialogFunctionsX')
      vueObj.data && Object.assign(vueObj.data, extend.data)
      vueObj.methods && Object.assign(vueObj.methods, extend.methods)
      vueObj.computed && Object.assign(vueObj.computed, extend.computed)
    } catch(err) {
      console.log(err)
    }

	export default {
		beforeCreate() {
  			store = require('../../../store/entity').default(this.$options.propsData.storeName);
  			deleteItemById = store.deleteItemById;
			//this.$store = createStore(this.$options.propsData.storeName, '')
    	},
    	created() {
    		console.log(this.$store.state.table.entity)
    	},
		computed: vueObj.computed,
		methods: vueObj.methods,
		props: {
			storeName: String,
		},
	}
</script>

<style>
	
</style>