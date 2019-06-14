<template>
	<div>
	  <datetime type='datetime' v-model="val" :input-id="name" input-class='borderField' v-validate="validate" :data-vv-name="name" :name='name'>
	      <label slot="before">{{label}}</label>
	  </datetime>
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