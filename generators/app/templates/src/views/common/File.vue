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
			i: Number,
			name: String,
			multiple: Boolean,
			validationd: Object,
		},
	}
</script>

<style>
	
</style>