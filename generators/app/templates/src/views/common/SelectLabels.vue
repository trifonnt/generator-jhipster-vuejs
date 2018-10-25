<template>
  <v-select
    :items="labels"
    v-model="selectedLabels"
    label="Label"
    multiple
    chips
    item-avatar='search'
  >
    <template slot='item' slot-scope='label'>
      <v-list-tile-avatar>
        <div class='greenlabel'></div>
      </v-list-tile-avatar>
      <v-checkbox></v-checkbox>
      <v-list-tile-content>
        <v-list-tile-title v-html="label.item.text"></v-list-tile-title>
      </v-list-tile-content>
    </template>
  </v-select>
</template>

<script>
	let store;

	export default {
		beforeCreate() {		
			store = require('../../store/products').default(this.$options.propsData.storeName)
		},

		data: () => ({
	        labels: [
	          {text:'completed', value:1},
	          {text:'in progress', value:2}
	        ],
	        selectedLabels: [],
		}),

	 	watch: {
	        async selectedLabels(vals) {
				try{
					await saveLabels(this.checkedDeleted, vals);
					this.$emit('selected', vals)
				}
				catch(err) {
					console.log(err)
				}
	        },
	    },

	    props: {
	    	storeName: String,
	    }
	}
</script>