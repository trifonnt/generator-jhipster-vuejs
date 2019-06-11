<template>
	<div>
		<v-checkbox :autofocus='i==0' :label="label" v-model="val" :name='name' v-validate="validate"></v-checkbox>
		<v-alert :value="errors.has(name)" type="error">{{ errors.first(name) }}</v-alert>
	</div>
</template>

<script>
	export default {
		data: () => ({

		}),
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
				}
			}
		},
		inject: ['$validator'],
		props: {
			label: String,
			i: Number,
			name: String,
			fieldValidation: Object,
		},
	}
</script>

<style>
	.chart {
		height: 1000px;
	}
</style>