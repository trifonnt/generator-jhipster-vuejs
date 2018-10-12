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
	import {createStore} from '../../storex/'

	export default {
		beforeCreate() {
  			store = require('../../store/products').default(this.$options.propsData.storeName);
  			deleteItemById = store.deleteItemById;
			//this.$store = createStore(this.$options.propsData.storeName, '')
    	},
    	created() {
    		console.log(this.$store.state.table.product)
    	},
		computed: {
			deletedItem() {
			  return this.$store.state.table.product.deletedItem;
			},
		    dialog() {
		      return this.$store.state.table.product.dialog;
		    }
		},
		methods: {
			close() {
			    this.$store.commit('changeDialog', false)
			},
			async deleted() {
				console.log("HERE")
		        this.$store.commit('changeDialog', false)
		        try {
		        	console.log("HERE2")
		          await deleteItemById(this.deletedItem.id);
		        }
		        catch(err) {
		          this.$store.commit('snackShow', {text: "error", val: true})
		          console.log(err, "ERROR")
		        }
		        this.$store.dispatch('changePaginationWatcher', {page:1})
		    },
		},
		props: {
			storeName: String,
		},
	}
</script>

<style>
	
</style>