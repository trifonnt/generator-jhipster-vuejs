<template>
	<div>
	  <v-select :autofocus='i==0'
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
	      <span>
	      	{{label.item.count}}
	      </span>
	    </template>
	  </v-select>
	  <v-alert :value="errors.has(name)" type="error">{{ errors.first(name) }}</v-alert>
	</div>
</template>

<script>

	let store;
	export default {
		data: () => ({
	        labels: [
	          {text: 'completed', value: 1, count: 3,},
	          {text: 'in progress', value: 2, count: 3,}
	        ],
	        selectedLabels: [],
		}),
	    beforeCreate() {
	      store = require('../../store/entity').default(this.$options.propsData.storeName);
	    },
		created() {
			//this.getLabelData();
		},
		methods: {
	      async getLabelData() {
	        try {
	          let response = await store.getLabelData();
	          this.labels = response.labels;
	        }
	        catch(err) {
	          console.log(err)
	        }
	      }
	  	},
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
		},
	}
</script>