<template>
	<div>
		<input :name="name" type="file" multiple="multiple" @input="upload($event)" v-validate.reject="'image'">
	  	<v-alert :value="errors.has(name)" type="error">{{ errors.first(name) }}</v-alert>  
	</div>
</template>

<script>
	export default {
		inject:['$validator'],
		data: () => ({

		}),

		methods: {
			upload(e) {
				let files = e.target.files;
				let p = Promise.resolve();
				let parr = Object.keys(files).map(file=>p.then(()=>this.readFile(files[file])));
				Promise.all(parr).then(result=>{
					this.$store.commit('setValue', {i: this.i, val: result})
				})
			},
			readFile(file) {
				return new Promise((resolve, reject) => {
					let reader = new FileReader();
					reader.onload = () => {
						resolve(reader.result);
					};
					reader.onerror = reject;
					reader.readAsDataURL(file)
				})
			}
		},
		computed: {
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
			i: Number,
			name: String,
			multiple: Boolean,
			fieldValidation: Object,
		},
	}
</script>

<style>
	
</style>