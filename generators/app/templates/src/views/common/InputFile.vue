<template>
	<div>
    <input :name="name" :id='name' type="file" :multiple="multiple" @input="upload($event)" class='fileinput' :ref='name'/>
    <v-btn @click='chooseFile'>Upload</v-btn>
    <div v-show='files.length'><v-chip v-for='file in files'>{{file.name}} <v-icon @click='remove(file)'>delete</v-icon></v-chip></div>
</div>
</template>

<script>
	export default {
		data: () => ({
			files: [],
		}),
		methods: {
			upload(e) {
				this.files = [...e.target.files];
				this.$emit('upload', {files: e.target.files, name: e.target.name})
			},
			remove(file) {
				console.log(this.files)
				var index = this.files.indexOf(file);
				this.files.splice(this.files, 1)
			},
			chooseFile() {
				this.$refs[this.name].click();
			},
		},
		props: {
			multiple: {
				type: Boolean,
				default: false,
			},
			name: String,
		}
	}
</script>

<style>
	.fileinput {
		width: 0.1px;
		height: 0.1px;
		opacity: 0;
		overflow: hidden;
		position: absolute;
		z-index: -1;
	}

</style>