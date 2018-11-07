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
		  <v-btn color='primary' flat @click='dialog=!dialog'>Advanced search</v-btn>
		  <v-dialog v-model="dialog" max-width="700px">
		  	<v-card>
	          <v-card-title>
	            Advanced search
	          </v-card-title>
	          <v-card-text>
	          	<v-form>
	          	<v-container>
	          	<v-layout row wrap>
	          		<v-flex md12>
						<v-select
							v-model = 'savedSearch'
							:items="savedSearches"
							label="Saved searches"
						></v-select>
	          		</v-flex>
	          		<v-flex md3>
			      	    <v-select
			      	      v-model = 'advancedValues.selected'
				          :items="advanced.selectItems"
				          label="Label"
				        ></v-select>
			    	</v-flex>
			    	<v-flex md9>
	              	<v-text-field v-validate='{"alpha_dash":true}' name="code" label="Code" type="text" v-model="advancedValues2.code"></v-text-field>
	              </v-flex>
					<v-flex md3>
						<v-select
						  v-model = 'advancedValues.selected2'
						:items="advanced.selectItems2"
						label="Label"
						></v-select>
					</v-flex>
						<v-flex fluid>
						<v-text-field v-validate='{"alpha_dash":true}' name="code" label="Code" type="text" v-model="advancedValues2.code2"></v-text-field>
					</v-flex>
              </v-layout>
              </v-container>
          </v-form>
	          </v-card-text>
	          <v-card-actions>
	          	<v-btn color='success' flat icon @click='searchAdvanced'><v-icon>search</v-icon></v-btn>
	            <v-btn color="primary" flat @click='saveSearch'>Save search</v-btn>
	            <v-btn color="error" flat @click="dialog=false">Close</v-btn>
	          </v-card-actions>
	        </v-card>
		  </v-dialog>

</div>

<!--       <v-container>
        <v-layout row wra>
          <v-flex md4 justif>
          	<v-card>
				<v-card-text>
					{{model}}
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
				</v-card-text>
			</v-card>
		</v-flex>
	</v-layout>
</v-container> -->
</template>

<script>
	import axios from 'axios'
	let store = require('../../store/entity').default('userx');
	export default {
		created() {
			//this.getData();
		},
		data: () =>  ({
			advanced: [
				{selectItems: [{text: 'greater than', value: 1}, {text:'less than', value: 2}]},
				{selectItems2: [{text: 'equal', value: 1}, {text:'right*', value: 2},{text:'*left', value: 3}],},
			],
			advancedValues: {selected: 1, selected2: 2},
			advancedValues2: {code: '', code2: '',},
			savedSearch: null,
			savedSearches: [],
			dialog: false,
			model: null,
			items: [],
			loading: false,
			itemsOne: [],
			headers: [
				{text: "id", value:'id1'},
				{text: "text", value:'id2'},
				{text: "text2", value:'id3'},
			]
		}),

		computed: {
			searchQuery: {
				get() {return this.$store.state.table.entity.search},
				set(val) {this.$store.commit('setSearch', val)}
			}
		},
		methods: {
		  async getData() {
		  	try {
		  		let response = await getSavedSearches();
		  		this.advancedValues = response.advancedValues;
		  		this.advancedValues2 = response.advancedValues2;
		  	}
		  	catch(err) {
		  		console.log(err)
		  	}
		  },
	      search() {
	        if(!this.searchQuery) return false;
	        this.$store.dispatch('search', this.searchQuery)
	      },
	      searchAdvanced() {
	      	this.$store.dispatch('getData', {options: this.advancedValues, values: this.advancedValues2})
	      },
	      async saveSearch() {
	      	try {
	      		await store.saveSearch(this.advancedValues, this.advancedValues2)
	      	}
	      	catch(err) {
	      		console.log(err)
	      	}
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