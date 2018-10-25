<template>
	<tr>
	<th width='10px'>
	  <v-checkbox
	  	:input-value = 'allChecked'
	    :indeterminate="indeterminite"
	    primary
	    hide-details
	    @change="$store.commit('toggleAll')"
	  ></v-checkbox>
	</th>
	<th width='10px'>Label</th>
	<th
	  v-for="header in data.headers"
	  :key="header.text"
	  :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
	  @click="changeSort(header.value)"
	  :data-label='header.text'

	>
	  <v-icon small>arrow_upward</v-icon>
	  {{ header.text }}
	</th>
	</tr>
</template>

<script>
	import {mapGetters} from 'vuex'
	export default {
		data: () => ({}),
		computed: {
			allChecked() {
				return this.$store.getters.allChecked
			}
		},
		methods: {
			changeSort(val) {
				this.$store.dispatch('changeSort', val)
			}
		},
		props: {
			data: Object,
			pagination: Object,
			indeterminite: Boolean,
		},
	}
</script>

<style>
	
</style>