<template>
	<div>
	  <datetime type='datetime' v-model="val" :input-id="name" input-class='borderField' v-validate="validate" :data-vv-name="name" :name='name'>
	      <label slot="before">{{label}}</label>
	  </datetime>  
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