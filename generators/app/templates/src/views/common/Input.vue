<template>
	<div>
	  <v-text-field v-validate="validate" prepend-icon="person" :name="name" :label="label" v-model="val"></v-text-field>
	  <v-alert :value="errors.has(name)" type="error">{{ errors.first(name) }}</v-alert>  
	</div>
</template>

<script>
	export default {
		inject: ['$validator'],
		data: () => ({

		}),
		mounted() {
			console.log(this.$store.state.detail, "STORE")
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
				}
			}
		},
		props: {
			name: String,
			label: String,
			type: String,
			field_validation: Object,
			i: Number,
		},
	}
</script>

<style>
	
</style>