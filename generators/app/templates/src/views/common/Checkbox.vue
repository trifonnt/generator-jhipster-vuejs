<template>
	<div>
		<v-checkbox :label="label" v-model="val" :name='name' v-validate="validate"></v-checkbox>
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
		inject: ['$validator'],
		props: {
			label: String,
			i: Number,
			name: String,
			field_validation: Object,
		},
	}
</script>

<style>
	
</style>