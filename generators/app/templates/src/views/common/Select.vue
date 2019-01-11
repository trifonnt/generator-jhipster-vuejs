<template>
	<div>
		<v-select multiple :items='items' item-text='name' item-value='code' solo v-validate="validate" :data-vv-name="name" :name='name' :label="label" v-model="val" return-object></v-select>
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
			items: Array,
			field_validation: Object,
			label: String,
			name: String,
			i: Number,
		},
	}
</script>

<style>
	
</style>