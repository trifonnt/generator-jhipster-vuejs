<template>
	<div>
		<v-select :items='items' solo v-validate="{required, min, max, regex: pattern}" :data-vv-name="name" :name='name' :label="label" v-model="val"></v-select>
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
					return this.$store.state.detail.fields[this.i];
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
			items: Array,
			validationd: Object,
			label: String,
			name: String,
			i: Number,
		},
	}
</script>

<style>
	
</style>