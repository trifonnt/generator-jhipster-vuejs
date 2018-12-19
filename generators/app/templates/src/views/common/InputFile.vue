<template>
	<div>
    <input :name="name" :id='name' type="file" :multiple="multiple" @input="upload($event)" class='fileinput' :ref='name'/>
    <v-btn @click='chooseFile'>Upload</v-btn>
    <div v-show='uploadedFiles && uploadedFiles.length'><v-chip v-for='file in uploadedFiles'>{{file.name}} <v-icon @click='removeUploaded(file)'>delete</v-icon></v-chip></div>
</div>
</template>

<script>
	export default {
		data() {
			return {
				uploadedFiles: [],
			}
		},
		methods: {
			upload(e) {
				this.uploadedFiles = [...e.target.files];
				this.$emit('upload', {files: e.target.files, name: e.target.name})
			},
			removeUploaded(file) {
				var index = this.uploadedFiles.indexOf(file);
				this.$emit('removeUpload', {field: file.field})
				this.uploadedFiles.splice(index, 1)
			},
			chooseFile() {
				this.$refs[this.name].click();
			},
		},
		watch: {
			files(val) {
				this.uploadedFiles = val;
			}
		},
		props: {
			multiple: {
				type: Boolean,
				default: false,
			},
			name: String,
			files: Array,
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