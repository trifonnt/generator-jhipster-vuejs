<template>
	<div class='searchbox'>
	  	<v-autocomplete
		  :allow-overflow='false'
		    v-model="model"
		    :items="items"
		    placeholder="Search"
		    prepend-icon="search"
		    :search-input.sync="searchQuery"
		    cache-items
		    return-object
		    :async-loading='loading'
		    :filter="v => v"
		  >

			<template slot="item" slot-scope="{item}">
				<div class='leftcol'>{{item.text.substr(0,20)}}</div> <div class='rightcol'>{{item._id}}</div>
			</template>

		  </v-autocomplete>
	</div>
</template>

<script>
	export default {
		data: () =>  ({
			model: null,
			items: [],
			loading: false,
		}),
		computed: {
			searchQuery: {
				get() {return this.$store.state.table.product.search},
				set(val) {this.$store.commit('setSearch', val)}
			}
		},
		methods: {
	      search() {
	        if(!this.searchQuery) return false;
	        this.$store.dispatch('search', this.searchQuery)
	      },
	      deleteQuery() {
	        this.$store.dispatch('search', '')
	      },
		},

		watch: {
			async searchQuery(val) {
		    	//this.search();
			    try {
			    	let response = await axios.get('https://cat-fact.herokuapp.com/facts');
			    	this.items = response.data.all;
			    	this.items.splice(0,0,{_id:'aa', text:'yy', disabled: true})
			    	console.log(this.items)
			    }
			    catch(err) {
			    	console.log(err)
			    }
			}
		}
	}
</script>

<style>

	.leftcol {
		width:200px;
		float: left;
	}
	.rightcol {
		width: 200px;
		float: right;
	}
	.v-select-list > .v-list > div:nth-child(odd) {
		background: #f5f5f5;
	}
	.v-select-list > .v-list > div:first-child {
		border-bottom: 1px solid lightgray;
	}

	.searchbox {
		display: inline-block;
		width: 40%;
		margin-left: 30px;
	}

	.searchbox .v-text-field__details {
		display: none;
	}

	.searchbox .v-input__slot {
		margin: 0;
	}

	@media only screen and (max-width: 446px) {
		.searchbox {
			display: block;
			width: 90%;
		}
	}
	
</style>