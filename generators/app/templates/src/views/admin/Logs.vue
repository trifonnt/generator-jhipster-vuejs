<template>
	<div>
		<div id='search'>
			<v-layout wrap align-center>
			  <v-flex xs12 sm3 d-flex>
		 		  <v-text-field
				 	id='text'
				    v-model="search"
				    append-icon="search"
				    label="Search"
				    clearable
				  >
				  	
				  </v-text-field>
		  	  </v-flex>
			  <v-flex xs12 sm3 d-flex>
			  	<v-select 
			  	id='select' 
			  	:items='levels'
			  	label = 'Level'
			  	item-text='name'
			  	v-model = 'filterLevel'
			  	clearable
			  	>
			  	
			  	</v-select>
		  	  </v-flex>
		  	</v-layout>
		</div>
		  <v-data-table
		  	v-if='items'
		  	:custom-filter = 'customFilter'
		    :headers="headers"
		    :items="customFilter"
		    class="elevation-1"
		    :pagination.sync="pagination"
		    :rows-per-page-items='[5,10,20,{"text":"$vuetify.dataIterator.rowsPerPageAll","value":-1}]'
		  >
		    <template slot="items" slot-scope="props">
		      <td data-label='Name' class="text-xs-left show">{{ props.item.name }}</td>
		      <td data-label='Level' class="text-xs-left">
		      	<v-btn @click='setLevel(props.item, level)' v-for='level in levels' :outline='level.name != props.item.level' :color='level.color'>{{level.name}}</v-btn>
		      </td>
		    </template>
		  </v-data-table>
	</div>
</template>

<script>
	import * as store from '../../store/stats'
	export default {
		watch: {
			search(val) {

			}
		},
		data: () => ({
			logs: [],
			levels: [
				{name: 'TRACE', color: 'success'}, 
				{name: 'DEBUG', color: 'grey lighten-1'}, 
				{name: 'INFO', color: 'info'}, 
				{name: 'WARN', color: 'warning'}, 
				{name: 'ERROR', color: 'error'}
			],
			pagination: {
				rowsPerPage: 20,
			},
			search: '',
			filterLevel: '',
		}),
		created() {
			this.getData();
		},
		methods: {
			async setLevel(item, level) {
				try {
					let res = await store.setLogsLevel(item, level.name);
					item.level = level.name
				}
				catch(err) {
					console.log(err)
		         	this.$store.dispatch('snackShowAction', {text: err, val: true, color: "error"})
				}
			},
			async getData() {
				try {
					let res = await store.getLogs();
					this.logs = res;
				}
				catch(err) {
					console.log(err)
		         	this.$store.dispatch('snackShowAction', {text: err, val: true, color: "error"})
				}
			}
		},
		computed: {
			customFilter() {
				return this.logs.filter(o=> {
					if(!this.filterLevel) return o.name.includes(this.search)
					return o.name.includes(this.search) && o.level == this.filterLevel
				})
			},
			headers() {
				return [
					{text:"Name", value: this.$t('audits.table.header.timestamp')},
					{text:"Level", value: this.$t('audits.table.header.principal')},
				]
			},
			items() {
				return this.logs;
			}
		},
	}
</script>

<style scoped>

</style>