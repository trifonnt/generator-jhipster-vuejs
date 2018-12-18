<template>
	<div>
    <input :name="name" :id='name' type="file" :multiple="multiple" @input="upload($event)" class='fileinput' :ref='name'/>
    <v-btn @click='chooseFile'>Upload</v-btn>
    <span v-show='localFiles && localFiles.length'><v-chip v-for='file in localFiles'>{{file.name}} <v-icon @click='remove(file)'>delete</v-icon></v-chip></span>
</div>
</template>

<script>
	export default {
		data: () => ({
			localFiles: this.files
		}),
		methods: {
			upload(e) {
				this.localFiles.push(...e.target.files);
				this.$emit('upload', {files: e.target.files, name: e.target.name})
			},
			remove(file) {
				var index = this.localFiles.indexOf(file);
				this.localFiles.splice(index, 1)
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
			files: Object,
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