<template>
	<div>
		<v-menu
	        ref="menu"
	        :close-on-content-click="false"
	        v-model="menu"
	        :nudge-right="40"
	        :return-value.sync="val"
	        lazy
	        transition="scale-transition"
	        offset-y
	        full-width
	        min-width="290px"
	      >
	        <v-text-field v-validate="{required, date_format}"
	          slot="activator"
	          v-model="val"
	          :label="label"
	          :name = 'name'
	          prepend-icon="event"
	          readonly
	        ></v-text-field>
	        <v-date-picker v-model="date">
	        	<v-spacer></v-spacer>
  				<v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
      			<v-btn flat color="primary" @click="$refs.menu.save(date);val=date">OK</v-btn>
	        </v-date-picker>
	      </v-menu>
		  <v-alert :value="errors.has(name)" type="error">{{ errors.first(name) }}</v-alert>  
  	</div>
</template>

<script>
	export default {
		data: () => ({
			menu: false,
			date: null,
		}),
		created() {

		},
		mounted() {

		},
		computed: {
			val: {
				set(val) {
					this.$store.commit('setValue',{i: this.i, val})
				},
				get() {
					return this.$store.state.detail.fields[this.i].val;
				}
			},
			date_format() {
				return this.validationd['date_format'];
			},
			required() {
				return this.validationd.required;
			},
			min() {
				return this.validationd.min;
			},
			max() {
				return this.validationd.max;
			},
			pattern() {
				return this.validationd.pattern;
			},
		},
		inject: ['$validator'],
		props: {
			name: String,
			label: String,
			i: Number,
			validationd: Object,
		},
	}
</script>

<style>
	
</style>