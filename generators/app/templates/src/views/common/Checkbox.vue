<template>
	<div>
		<v-checkbox :label="label" v-model="val" :name='name' v-validate="{required, regex: pattern}"></v-checkbox>
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
			label: String,
			i: Number,
			name: String,
			validationd: Object,
		},
	}
</script>

<style>
	
</style>