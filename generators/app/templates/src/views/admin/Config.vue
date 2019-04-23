<template>
	<div>
		<v-layout wrap align-center>
		  <v-flex xs12 sm3 d-flex>
		 	  <v-text-field
			 	id='text'
			    v-model="search"
			    append-icon="search"
			    label="Search prefix"
			    clearable
			  >
			  	
			  </v-text-field>
			  </v-flex>
		</v-layout>
	  <v-data-table
	  	v-if='items'
	    :headers="headers"
	    :items="customFilter"
	    class="elevation-1"
	  >
	    <template slot="items" slot-scope="props">
	      <td data-label='Prefix' class="show text-xs-left">{{ props.item.prefix }}</td>
	      <td data-label='Properties' class="text-xs-left">
	      	<div v-for='(v, i) in props.item.properties'>
	      		<v-chip label color='primary'>{{i}}</v-chip>
	  			<json-viewer :value="v" boxed></json-viewer>
	      	</div>
	      </td>
	    </template>
	  </v-data-table>
	</div>
</template>

<script>
	import * as store from '../../store/stats'
	export default {
		data: () => ({
			audits: [],
			search: '',
		}),
		created() {
			this.getData();
		},
		methods: {
			async getData() {
				try {
					let res = await store.getConfig();
					console.log(res, "RES")
					this.audits = res;
				}
				catch(err) {
					console.log(err)
		         	this.$store.dispatch('snackShowAction', {text: err, val: true, color: "error"})
				}
			},
			getKeys(item) {
				return Object.keys(item);
			},
		},
		computed: {
			customFilter() {
				return this.audits.filter(o=>o.prefix.includes(this.search))
			},
			headers() {
				return [
					{text:"Prefix", value: this.$t('audits.table.header.timestamp')},
					{text:"Properties", value: this.$t('audits.table.header.principal')},
				]
			},
			items() {
				return this.audits;
			}
		},
	}
</script>

<style scoped>
	.properties {
		text-align: right;
	}
</style>