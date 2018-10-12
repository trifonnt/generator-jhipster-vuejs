<template>
	<div>
	  <v-text-field v-validate="{required, min, max, regex: pattern,}" prepend-icon="person" :name="name" label="label" v-model="val"></v-text-field>
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
		props: {
			name: String,
			label: String,
			type: String,
			validationd: Object,
			i: Number,
		},
	}
</script>

<style>
	
</style>