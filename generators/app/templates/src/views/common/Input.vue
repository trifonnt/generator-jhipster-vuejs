<template>
	<div>
	  <v-text-field :autofocus='i==0' v-validate="validate" prepend-icon="person" :name="name" :label="label" v-model="val">
	  	<div slot='append' v-show='showButtons'>
	  		<v-icon @click='clear'>close</v-icon>
	  		<v-icon @click='save'>save</v-icon>
	  	</div>
	  </v-text-field>
	  <v-alert :value="errors.has(name)" type="error">{{ errors.first(name) }}</v-alert>
	</div>
</template>

<script>
	export default {
		inject: ['$validator'],
		data: () => ({
			oldValue: '',
		}),
		mounted() {
			console.log(this.$store.state.detail, "STORE")
		},
		created() {
			this.oldValue = this.val;
		},
		methods: {
			save() {
				this.$store.commit('setValue',{i: this.i, val: this.val, final: true})
			},
			clear() {
				this.val = this.oldValue;
				this.$emit('clear')
			},
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
		props: {
			name: String,
			label: String,
			typeName: String,
			fieldValidation: Object,
			i: Number,
			showButtons: {
				type: Boolean,
				default: false,
			}
		},
	}
</script>

<style>
	
</style>