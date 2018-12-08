


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
		  :class="['column sortable', pagination.descending ? 'desc' : 'asc', 'code' === pagination.sortBy ? 'active' : '']"
		  @click="changeSort(code)"
		  :data-label='$t("task.euromebelApp.task.code")'
		>
		  	<v-icon small>arrow_upward</v-icon>
	  		{{$t("task.euromebelApp.task.code")}}
		</th>
	
		<th
		  :class="['column sortable', pagination.descending ? 'desc' : 'asc', 'name' === pagination.sortBy ? 'active' : '']"
		  @click="changeSort(name)"
		  :data-label='$t("task.euromebelApp.task.name")'
		>
		  	<v-icon small>arrow_upward</v-icon>
	  		{{$t("task.euromebelApp.task.name")}}
		</th>
	
		<th
		  :class="['column sortable', pagination.descending ? 'desc' : 'asc', 'description' === pagination.sortBy ? 'active' : '']"
		  @click="changeSort(description)"
		  :data-label='$t("task.euromebelApp.task.description")'
		>
		  	<v-icon small>arrow_upward</v-icon>
	  		{{$t("task.euromebelApp.task.description")}}
		</th>
	
	
		<th
		  :class="['column sortable', pagination.descending ? 'desc' : 'asc', 'responsiblePerson' === pagination.sortBy ? 'active' : '']"
		  @click="changeSort(responsiblePerson)"
		  :data-label='$t("task.euromebelApp.task.responsiblePerson")'
		>
		  	<v-icon small>arrow_upward</v-icon>
	  		{{$t("task.euromebelApp.task.responsiblePerson")}}
		</th>
	
		<th
		  :class="['column sortable', pagination.descending ? 'desc' : 'asc', 'taskUpdate' === pagination.sortBy ? 'active' : '']"
		  @click="changeSort(taskUpdate)"
		  :data-label='$t("task.euromebelApp.task.taskUpdate")'
		>
		  	<v-icon small>arrow_upward</v-icon>
	  		{{$t("task.euromebelApp.task.taskUpdate")}}
		</th>
	
<!-- 	<th
	  v-for="header in data.headers"
	  :key="header.text"
	  :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
	  @click="changeSort(header.value)"
	  :data-label='header.text'

	> -->
	<th>Actions</th>
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
	