<template>
		<div id='dropzoneContainer'>
			<div>
				<vue-dropzone ref="myVueDropzone" id="dropzone"  :useCustomSlot='true' :options="dropzoneOptions" :duplicateCheck="true" @vdropzone-file-added='addedFile'
				>
			      <div class="dropzone-custom-content">
			        <div class="dropzone-custom-title">
			        	<!-- credit the author-->
			        	<img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDYwIDYwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA2MCA2MDsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIxMjhweCIgaGVpZ2h0PSIxMjhweCI+CjxnPgoJPHBhdGggZD0iTTUwLjk3NSwyMC42OTRjLTAuNTI3LTktNy45NDYtMTYuMTk0LTE2Ljg5MS0xNi4xOTRjLTUuNDMsMC0xMC42ODgsMi42NjMtMTMuOTQ2LDcuMDA4ICAgYy0wLjA3NC0wLjAzOS0wLjE1My0wLjA2NS0wLjIyOC0wLjEwMmMtMC4xOTgtMC4wOTYtMC4zOTktMC4xODgtMC42MDUtMC4yNjljLTAuMTE1LTAuMDQ1LTAuMjMtMC4wODYtMC4zNDYtMC4xMjcgICBjLTAuMjAyLTAuMDcxLTAuNDA2LTAuMTMzLTAuNjE1LTAuMTljLTAuMTE2LTAuMDMxLTAuMjMxLTAuMDYzLTAuMzQ5LTAuMDljLTAuMjI0LTAuMDUxLTAuNDUyLTAuMDktMC42ODMtMC4xMjQgICBjLTAuMTAyLTAuMDE1LTAuMjAyLTAuMDM1LTAuMzA1LTAuMDQ3QzE2LjY3NywxMC41MjMsMTYuMzQxLDEwLjUsMTYsMTAuNWMtNC45NjIsMC05LDQuMDM3LTksOWMwLDAuMTI5LDAuMDA3LDAuMjU1LDAuMDE2LDAuMzgxICAgQzIuODU3LDIyLjE0OCwwLDI2Ljg5OSwwLDMxLjY1NEMwLDM4LjczNyw1Ljc2Miw0NC41LDEyLjg0NSw0NC41SDE4YzAuNTUyLDAsMS0wLjQ0NywxLTFzLTAuNDQ4LTEtMS0xaC01LjE1NSAgIEM2Ljg2NSw0Mi41LDIsMzcuNjM1LDIsMzEuNjU0YzAtNC4xNTQsMi43MDUtOC40NjYsNi40MzItMTAuMjUzTDksMjEuMTNWMjAuNWMwLTAuMTIzLDAuMDA4LTAuMjQ5LDAuMDE1LTAuMzc1bDAuMDA5LTAuMTc1ICAgbC0wLjAxMi0wLjE4OEM5LjAwNywxOS42NzUsOSwxOS41ODgsOSwxOS41YzAtMy44NTksMy4xNC03LDctN2MwLjMwOSwwLDAuNjE0LDAuMDI3LDAuOTE3LDAuMDY3ICAgYzAuMDc4LDAuMDEsMC4xNTUsMC4wMjMsMC4yMzIsMC4wMzZjMC4yNjgsMC4wNDQsMC41MzIsMC4xMDIsMC43OTIsMC4xNzdjMC4wMzQsMC4wMSwwLjA2OSwwLjAxNiwwLjEwMiwwLjAyNiAgIGMwLjI4NiwwLjA4NywwLjU2NSwwLjE5OCwwLjgzOCwwLjMyMmMwLjA2OSwwLjAzMSwwLjEzNywwLjA2NSwwLjIwNSwwLjA5OWMwLjI0MiwwLjExOSwwLjQ3OSwwLjI1MSwwLjcwNywwLjM5OSAgIEMyMS43MiwxNC44NzUsMjMsMTcuMDM5LDIzLDE5LjVjMCwwLjU1MywwLjQ0OCwxLDEsMXMxLTAuNDQ3LDEtMWMwLTIuNzU0LTEuMjQ2LTUuMjE5LTMuMi02Ljg3MSAgIEMyNC42NjYsOC44NzksMjkuMzg4LDYuNSwzNC4wODQsNi41YzcuNzQ0LDAsMTQuMTc4LDYuMTM1LDE0Ljg0OCwxMy44ODdjLTEuMDIyLTAuMDcyLTIuNTUzLTAuMTA5LTQuMDgzLDAuMTI1ICAgYy0wLjU0NiwwLjA4My0wLjkyMSwwLjU5My0wLjgzOCwxLjEzOWMwLjA3NSwwLjQ5NSwwLjUwMSwwLjg1LDAuOTg3LDAuODVjMC4wNSwwLDAuMTAxLTAuMDA0LDAuMTUyLTAuMDEyICAgYzIuMjI0LTAuMzM2LDQuNTQzLTAuMDIxLDQuNjg0LTAuMDAyQzU0LjQ5LDIzLjM3Miw1OCwyNy42NjEsNTgsMzIuNDcyQzU4LDM4LjAwMSw1My41MDEsNDIuNSw0Ny45NzIsNDIuNUg0NCAgIGMtMC41NTIsMC0xLDAuNDQ3LTEsMXMwLjQ0OCwxLDEsMWgzLjk3MkM1NC42MDQsNDQuNSw2MCwzOS4xMDQsNjAsMzIuNDcyQzYwLDI2Ljk4Myw1Ni4xNzMsMjIuMDYsNTAuOTc1LDIwLjY5NHoiIGZpbGw9IiMwMDZERjAiLz4KCTxwYXRoIGQ9Ik0zMS43MDgsMzAuNzk0Yy0wLjA5Mi0wLjA5My0wLjIwMy0wLjE2Ni0wLjMyNi0wLjIxN2MtMC4yNDQtMC4xMDEtMC41Mi0wLjEwMS0wLjc2NCwwICAgYy0wLjEyMywwLjA1MS0wLjIzMywwLjEyNC0wLjMyNiwwLjIxN2wtNy45OTksNy45OTljLTAuMzkxLDAuMzkxLTAuMzkxLDEuMDIzLDAsMS40MTRDMjIuNDg4LDQwLjQwMiwyMi43NDQsNDAuNSwyMyw0MC41ICAgczAuNTEyLTAuMDk4LDAuNzA3LTAuMjkzTDMwLDMzLjkxNFY1NC41YzAsMC41NTMsMC40NDgsMSwxLDFzMS0wLjQ0NywxLTFWMzMuOTE0bDYuMjkzLDYuMjkzQzM4LjQ4OCw0MC40MDIsMzguNzQ0LDQwLjUsMzksNDAuNSAgIHMwLjUxMi0wLjA5OCwwLjcwNy0wLjI5M2MwLjM5MS0wLjM5MSwwLjM5MS0xLjAyMywwLTEuNDE0TDMxLjcwOCwzMC43OTR6IiBmaWxsPSIjMDA2REYwIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" />
			        </div>
			        <div class="subtitle">Click, Drag and Drop to upload content!</div>
			      </div>
				</vue-dropzone>
				<div v-show='files.length' @click = '$refs.myVueDropzone.processQueue();$emit("loading",true)' class='center'>
					<v-btn :loading="loading"
				      :disabled="loading"color="primary">Submit
				  	</v-btn>
			  </div>
			</div>
		</div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import Dropzone from 'dropzone'

import Sortable from 'sortablejs'

export default {
  name: 'app',
  components: {
    vueDropzone: vue2Dropzone
  },
  watch: {
    uploadedFiles() {
      for(file of this.uploadedFiles) {
        let fileObj = {name: file.fileName, size: file.fileSize, type: file.contentType}
        this.$refs.myVueDropzone.manuallyAddFile(fileObj, '')
      }
    }
  },
  created() {
  	this.$nextTick(()=> {
  		this.$refs.myVueDropzone.dropzone.__proto__.submitRequest = (xhr, formData, file) => {
  			this.$emit('uploadFile', {file, name: this.name})
  			//set loading as a prop
  		};
  		var el = document.getElementById('dropzone');
		  var sortable = new Sortable(el, {
        onEnd(e) {
          e.item.dataset.order = e.newIndex;
        }
      })
  	})
  },
  computed: {
  	dropzoneOptions() {
  		let opts = {};
  		Object.assign(opts, this.dropzoneOptionsDefault, {maxFilesize: this.maxFilesize || 10, maxFiles: this.maxFiles || 20, acceptedFiles: this.acceptedFiles || 'image/*,.pdf'});
  		return opts;
  	}
  },
  data: function () {
    return {
      files: [],
      dropzoneOptionsDefault: {
      	  maxFilesize: 10,
      	  acceptedFiles: 'image/*,.pdf',
      	  maxFiles: 20,
          url: 'https://httpbin.org/post',
          thumbnailWidth: 150,
          maxFilesize: 0.5,
          camera: 'true',
          autoProcessQueue: false,
          addRemoveLinks: true,
      }
    }
  },
  methods: {
  	addedFile(file) {
  		this.files.push(file)
  	}
  },
  props: {
  	multiple: {
  		type: Boolean,
  		default: false,
  	},
  	uploadedFiles: {
  		type: Array,
  		default: [],
  	},
  	loading: Boolean,
  	name: String,
  	maxFilesize: {
  		type: Number,
  		default: 10,
  	},
  	acceptedFiles: {
  		type: String,
  		default: 'image/*,.pdf'
  	},
  	maxFiles: {
  		type: Number,
  		default: 20,
  	}
  }
}
</script>

<style scoped>
	#dropzoneContainer {
		display: flex;
		justify-content: center;
		align-items: center;
		height: calc(100vh - 120px);
	}
	#dropzone {
		display: flex;
		flex-wrap: wrap;
		background: white;
		border: 2px dashed #0087F7;
		width: 300px;
		min-height: 300px;
	}

.dropzone-custom-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.dropzone-custom-title {

}

.subtitle {
  color: #314b5f;
}
	.subtitle {
	  color: #314b5f;
	}
	.largeicon {
		font-size: 140px;
	}
	.center {
		text-align: center;
	}
</style>