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
	        <v-text-field v-validate="validate"
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
				return this.field_validation['date_format'];
			},
			required() {
				return this.field_validation && this.field_validation.required;
			},
			min() {
				return this.field_validation && this.field_validation.minValue;
			},
			max() {
				return this.field_validation && this.field_validation.maxValue;
			},
			pattern() {
				return this.field_validation && this.field_validation.pattern;
			},
			validate() {
				if(!this.field_validation) return null;
				return {
					required: this.field_validation.required,
					min: this.field_validation.minValue,
					max: this.field_validation.maxValue,
					regex: this.field_validation.regex,
					date_format: this.field_validation.date_format,
				}
			}
		},
		inject: ['$validator'],
		props: {
			name: String,
			label: String,
			i: Number,
			field_validation: Object,
		},
	}
</script>

<style>
	
</style>