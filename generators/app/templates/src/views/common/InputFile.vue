<template>
	<div>
    <input :name="name" :id='name' type="file" :multiple="multiple" @input="upload($event)" class='fileinput' :ref='name'/>
    <v-btn @click='chooseFile'>Upload</v-btn>
    <span v-show='localFiles && localFiles.length'><v-chip v-for='file in localFiles'>{{file.name}} <v-icon @click='remove(file)'>delete</v-icon></v-chip></span>
</div>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			upload(e) {
				this.localFiles.push(...e.target.files);
				this.$emit('upload', {files: e.target.files, name: e.target.name})
			},
			remove(file) {
				var index = this.localFiles.indexOf(file);
				this.localFiles.splice(index, 1)
				if(this.localFiles.length == 0) this.$refs[this.name].value='';
			},
			chooseFile() {
				this.$refs[this.name].click();
			},
		},
		computed: {
			localFiles() {
				return this.files;
			}
		}
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