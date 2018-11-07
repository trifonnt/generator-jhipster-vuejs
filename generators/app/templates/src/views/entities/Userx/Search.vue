

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
			      	      v-model = 'advancedValues.selectedlogin'
				          :items="advanced.selectItems2"
				          label="Label"
				        ></v-select>
			    	</v-flex>
			    	<v-flex md9>
					
	                      <v-text-field  autofocus  v-validate='{"min":"1","max":"50","pattern":"(^[_.@A-Za-z0-9-]*$)","alpha_dash":true}' name="login" label="Login" type="text" v-model="login"></v-text-field>
	                      <v-alert :value="errors.has('login')" type="error">{{ errors.first('login') }}</v-alert>  
	                    

	                    
	                    
	                    
	              	</v-flex>
	              	
	          		<v-flex md3>
			      	    <v-select
			      	      v-model = 'advancedValues.selectedactivated'
				          :items="advanced.selectItems"
				          label="Label"
				        ></v-select>
			    	</v-flex>
			    	<v-flex md9>
					

	                    
	                      <v-checkbox   :value='activated' label='Activated' v-validate='{"boolean":true}' name='active' ></v-checkbox>
	                      <v-alert :value="errors.has('activated')" type="error">{{ errors.first('activated') }}</v-alert>
	                    
	                    
	                    
	              	</v-flex>
	              	
	          		<v-flex md3>
			      	    <v-select
			      	      v-model = 'advancedValues.selectedauthorities'
				          :items="advanced.selectItems2"
				          label="Label"
				        ></v-select>
			    	</v-flex>
			    	<v-flex md9>
					
	                      <v-text-field  v-validate='{"alpha_dash":true}' name="authorities" label="Authorities" type="text" v-model="authorities"></v-text-field>
	                      <v-alert :value="errors.has('authorities')" type="error">{{ errors.first('authorities') }}</v-alert>  
	                    

	                    
	                    
	                    
	              	</v-flex>
	              	
	          		<v-flex md3>
			      	    <v-select
			      	      v-model = 'advancedValues.selectedcreatedby'
				          :items="advanced.selectItems2"
				          label="Label"
				        ></v-select>
			    	</v-flex>
			    	<v-flex md9>
					
	                      <v-text-field  v-validate='{"alpha_dash":true}' name="createdBy" label="Created By" type="text" v-model="createdBy"></v-text-field>
	                      <v-alert :value="errors.has('createdBy')" type="error">{{ errors.first('createdBy') }}</v-alert>  
	                    

	                    
	                    
	                    
	              	</v-flex>
	              	
	          		<v-flex md3>
			      	    <v-select
			      	      v-model = 'advancedValues.selectedcreateddate'
				          :items="advanced.selectItems"
				          label="Label"
				        ></v-select>
			    	</v-flex>
			    	<v-flex md9>
					

	                    
	                    
	                      <v-menu
	                          ref="menucreatedDate"
	                          :close-on-content-click="false"
	                          v-model="menucreatedDate"
	                          :nudge-right="40"
	                          :return-value.sync="createdDate"
	                          lazy
	                          transition="scale-transition"
	                          offset-y
	                          full-width
	                          min-width="290px"
	                        >
	                          <v-text-field
	                            slot="activator"
	                            label="Created Date"
	                            prepend-icon="event"
	                            readonly
	                          ></v-text-field>
	                          <v-date-picker v-model="createdDate" @input="$refs.menucreatedDate.save(createdDate)"></v-date-picker>

	                        </v-menu>
	                        <v-alert :value="errors.has('createdDate')" type="error">{{ errors.first('createdDate') }}</v-alert>
	                    
	                    
	              	</v-flex>
	              	
	          		<v-flex md3>
			      	    <v-select
			      	      v-model = 'advancedValues.selectedemail'
				          :items="advanced.selectItems2"
				          label="Label"
				        ></v-select>
			    	</v-flex>
			    	<v-flex md9>
					
	                      <v-text-field  v-validate='{"min":"5","max":"254","alpha_dash":true}' name="email" label="Email" type="text" v-model="email"></v-text-field>
	                      <v-alert :value="errors.has('email')" type="error">{{ errors.first('email') }}</v-alert>  
	                    

	                    
	                    
	                    
	              	</v-flex>
	              	
	          		<v-flex md3>
			      	    <v-select
			      	      v-model = 'advancedValues.selectedfirstname'
				          :items="advanced.selectItems2"
				          label="Label"
				        ></v-select>
			    	</v-flex>
			    	<v-flex md9>
					
	                      <v-text-field  v-validate='{"max":"50","alpha_dash":true}' name="firstName" label="First Name" type="text" v-model="firstName"></v-text-field>
	                      <v-alert :value="errors.has('firstName')" type="error">{{ errors.first('firstName') }}</v-alert>  
	                    

	                    
	                    
	                    
	              	</v-flex>
	              	
	          		<v-flex md3>
			      	    <v-select
			      	      v-model = 'advancedValues.selectedimageurl'
				          :items="advanced.selectItems2"
				          label="Label"
				        ></v-select>
			    	</v-flex>
			    	<v-flex md9>
					
	                      <v-text-field  v-validate='{"max":"256","alpha_dash":true}' name="imageUrl" label="Image Url" type="text" v-model="imageUrl"></v-text-field>
	                      <v-alert :value="errors.has('imageUrl')" type="error">{{ errors.first('imageUrl') }}</v-alert>  
	                    

	                    
	                    
	                    
	              	</v-flex>
	              	
	          		<v-flex md3>
			      	    <v-select
			      	      v-model = 'advancedValues.selectedlangkey'
				          :items="advanced.selectItems2"
				          label="Label"
				        ></v-select>
			    	</v-flex>
			    	<v-flex md9>
					
	                      <v-text-field  v-validate='{"min":"2","max":"6","alpha_dash":true}' name="langKey" label="Lang Key" type="text" v-model="langKey"></v-text-field>
	                      <v-alert :value="errors.has('langKey')" type="error">{{ errors.first('langKey') }}</v-alert>  
	                    

	                    
	                    
	                    
	              	</v-flex>
	              	
	          		<v-flex md3>
			      	    <v-select
			      	      v-model = 'advancedValues.selectedlastmodifiedby'
				          :items="advanced.selectItems2"
				          label="Label"
				        ></v-select>
			    	</v-flex>
			    	<v-flex md9>
					
	                      <v-text-field  v-validate='{"alpha_dash":true}' name="lastModifiedBy" label="Last Modified By" type="text" v-model="lastModifiedBy"></v-text-field>
	                      <v-alert :value="errors.has('lastModifiedBy')" type="error">{{ errors.first('lastModifiedBy') }}</v-alert>  
	                    

	                    
	                    
	                    
	              	</v-flex>
	              	
	          		<v-flex md3>
			      	    <v-select
			      	      v-model = 'advancedValues.selectedlastmodifieddate'
				          :items="advanced.selectItems"
				          label="Label"
				        ></v-select>
			    	</v-flex>
			    	<v-flex md9>
					

	                    
	                    
	                      <v-menu
	                          ref="menulastModifiedDate"
	                          :close-on-content-click="false"
	                          v-model="menulastModifiedDate"
	                          :nudge-right="40"
	                          :return-value.sync="lastModifiedDate"
	                          lazy
	                          transition="scale-transition"
	                          offset-y
	                          full-width
	                          min-width="290px"
	                        >
	                          <v-text-field
	                            slot="activator"
	                            label="Last Modified Date"
	                            prepend-icon="event"
	                            readonly
	                          ></v-text-field>
	                          <v-date-picker v-model="lastModifiedDate" @input="$refs.menulastModifiedDate.save(lastModifiedDate)"></v-date-picker>

	                        </v-menu>
	                        <v-alert :value="errors.has('lastModifiedDate')" type="error">{{ errors.first('lastModifiedDate') }}</v-alert>
	                    
	                    
	              	</v-flex>
	              	
	          		<v-flex md3>
			      	    <v-select
			      	      v-model = 'advancedValues.selectedlastname'
				          :items="advanced.selectItems2"
				          label="Label"
				        ></v-select>
			    	</v-flex>
			    	<v-flex md9>
					
	                      <v-text-field  v-validate='{"max":"50","alpha_dash":true}' name="lastName" label="Last Name" type="text" v-model="lastName"></v-text-field>
	                      <v-alert :value="errors.has('lastName')" type="error">{{ errors.first('lastName') }}</v-alert>  
	                    

	                    
	                    
	                    
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
	let store = require('../../../store/entity').default('userx');
	export default {
		inject: ['$validator'],
		created() {
			//this.getData();
		},
		data: () =>  ({
	      
	        
	        
	        login: "",
	      
	        
	        
	        activated: "",
	      
	        
	        
	        authorities: "",
	      
	        
	        
	        createdBy: "",
	      
	        
	        
	        	menucreatedDate: '',
	        
	        createdDate: "",
	      
	        
	        
	        email: "",
	      
	        
	        
	        firstName: "",
	      
	        
	        
	        imageUrl: "",
	      
	        
	        
	        langKey: "",
	      
	        
	        
	        lastModifiedBy: "",
	      
	        
	        
	        	menulastModifiedDate: '',
	        
	        lastModifiedDate: "",
	      
	        
	        
	        lastName: "",
	      
		  
			advanced: [
				{selectItems: [{text: 'greater than', value: 1}, {text:'less than', value: 2}]},
				{selectItems2: [{text: 'equal', value: 1}, {text:'right*', value: 2},{text:'*left', value: 3}],},
			],
			advancedValues: {},
			advancedValues2: {"login":"\"\"","activated":"\"\"","authorities":"","createdBy":"\"\"","createdDate":"\"\"","email":"\"\"","firstName":"\"\"","imageUrl":"\"\"","langKey":"\"\"","lastModifiedBy":"\"\"","lastModifiedDate":"\"\"","lastName":"\"\""},
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
		  		//this.advancedValues2 = response.advancedValues2;
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