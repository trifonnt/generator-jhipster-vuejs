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
			i: Number,
			name: String,
			multiple: Boolean,
			field_validation: Object,
		},
	}
</script>

<style>
	
</style>