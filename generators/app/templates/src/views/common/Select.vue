<template>
	<div>
		<v-select :autofocus='i==0' multiple :items='items' item-text='name' item-value='code' solo v-validate="validate" :data-vv-name="name" :name='name' :label="label" v-model="val" return-object></v-select>
	  	<v-alert :value="errors.has(name)" type="error">{{ errors.first(name) }}</v-alert>


        <v-autocomplete
          multiple return-object 
          prepend-inner-icon="validate.required ? '*'' : false "
          :items='items'
          v-validate='validate' 
          :name="name" 
          :label="label"
          v-model="val"
          item-text='name' 
          item-value='code'
        >
        </v-autocomplete>

	  	<v-alert :value="errors.has(name)" type="error">{{ errors.first(name) }}</v-alert>	</div>
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
					return this.$store.state.detail.fields[this.i].val || [];
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
			items: Array,
			fieldValidation: Object,
			label: String,
			name: String,
			i: Number,
		},
	}
</script>

<style>
	
</style>