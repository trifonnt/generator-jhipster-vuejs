<template>
	<div>
		<v-menu :autofocus='i==0'
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
	        <v-text-field :autofocus='i==0' v-validate="validate"
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
				return this.fieldValidation['date_format'];
			},
			required() {
				return this.fieldValidation && this.fieldValidation.required;
			},
			min() {
				return this.fieldValidation && this.fieldValidation.minValue;
			},
			max() {
				return this.fieldValidation && this.fieldValidation.maxValue;
			},
			pattern() {
				return this.fieldValidation && this.fieldValidation.pattern;
			},
			validate() {
				if(!this.fieldValidation) return null;
				return {
					required: this.fieldValidation.required,
					min: this.fieldValidation.minValue,
					max: this.fieldValidation.maxValue,
					regex: this.fieldValidation.regex,
					date_format: this.fieldValidation.date_format,
				}
			}
		},
		inject: ['$validator'],
		props: {
			name: String,
			label: String,
			i: Number,
			fieldValidation: Object,
		},
	}
</script>

<style>
	
</style>