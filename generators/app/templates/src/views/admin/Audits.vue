<template>
  <v-data-table
  	v-if='items'
    :headers="headers"
    :items="items"
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td class="text-xs-left" v-for='item in props.item'>{{ item }}</td>
    </template>
  </v-data-table>
</template>

<script>
	import * as store from '../../store/stats'
	export default {
		data: () => ({
			audits: [],
		}),
		created() {
			this.getData();
		},
		methods: {
			async getData() {
				try {
					let res = await store.getAudits();
					this.audits = res;
				}
				catch(err) {
					console.log(err)
		         	this.$store.dispatch('snackShowAction', {text: err, val: true, color: "error"})
				}
			}
		},
		computed: {
			headers() {
				return [
					{text:"Timestamp", value: this.$t('audits.table.header.timestamp')},
					{text:"Principal", value: this.$t('audits.table.header.principal')},
					{text:"Value", value: this.$t('audits.table.header.value')},
					{text:"Data", value: this.$t('audits.table.header.data')},
				]
			},
			items() {
				return this.audits;
			}
		},
	}
</script>