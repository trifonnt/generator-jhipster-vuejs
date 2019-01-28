<template>
	<div>
		<div v-touch:swipe.left='nextImage' v-touch:swipe.right='prevImage' id='lightbox' v-show='lightbox'>
			<div id='imgcontainer'>
				<div id='menu'>
					<v-icon large color='red' class='icon' @click="$emit('delete',images[curImage])">delete</v-icon>
					<span @click='close' class='icon'><v-icon large>close</v-icon></span>
				</div>
				<div id='leftarrow' @click='prevImage' class='arrows' v-show='curImage > 0'>
					<
				</div>
				<div class='previewimg'>
					<img v-click-outside="clickOutside" :src='images[curImage].Contents'/>
				</div>
				<div id='rightarrow' @click='nextImage' class='arrows' v-show='curImage != images.length-1'>
					>
				</div>
			</div>
		</div>
		<v-btn v-show='selected.length' @click='deleteAll'>Delete all <v-icon color='red'>delete</v-icon></v-btn>
		<div id='gallery'>
			<div class='image' v-for='(image, i) in images'>
				<img :src='image.Contents' @click.stop='setImage(i)'/>
				<div :class='{overlay: true, showAll: showAll}'><v-checkbox :value='i' v-model='selected'></v-checkbox></div>
				<div class='filename'>{{image.FileName}}</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	#lightbox {
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(0, 100, 200, 0.5);
		opacity: 1;
		width: 100%;
		height: 100%;
		z-index: 9999;
/*		display: flex;
		justify-content: center;
		align-items: flex-start;
		flex: 1;*/
	}
	#lightbox #menu {
		padding: 3px;
		background: rgba(255, 255, 255,1 );
		position: absolute;
		top: 0px;
		right: 0px;
		font-size: 30px;
		text-align: right;
	}

	#imgcontainer {
		height: 100vh;
	}
	#menu .icon {
		cursor: pointer;
	}
	.previewimg {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border: 1px solid red;
	}
	.previewimg img {
		max-height: calc(100vh - 80px);
	}
	.deleteicon {
		font-size: 30px;
	}
	.arrows {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		font-size: 30px;
		cursor: pointer;
		width: 40px;
		height: 40px;
		background: white;
		text-align: center;
		vertical-align: middle;
		line-height: 40px;
		border-radius: 50%;
	}
	#leftarrow {
		left: 30px;
	}
	#rightarrow {
		right: 30px;
	}
	#gallery {
		margin-top: 30px;
		margin-left: 10px;
		margin-right: 10px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	#gallery .image {
		margin-top: 10px;
		cursor: pointer;
		width: 200px;
		height: 200px;
		position: relative;
	}
	#gallery .image img {
		position: absolute;
	}
	img {
		height: 100%;
	}
	.overlay {
		position: absolute;
		display: none;
		background: lightgray;
		width: 100%;
		height: 30px;
	}
	#gallery .image:hover .overlay {
		display: block;
	}
	.v-input--selection-controls {
		margin-top: 0;
	}
	.showAll {
		display: block;
	}
	.filename {
		position: absolute;
		top: 100%;
	}
</style>

<script>
	//v-click-outside
	//touch events
	//swipe events
	export default {
		data: () => ({
			selected: [],
			lightbox: false,
			curImage: 0,
			images: [{FileName: 'test1test1test1t est1tes t1te st1 tes t 1t e st1 ', Contents: 'https://via.placeholder.com/150'},{FileName: 'test1', Contents: 'https://via.placeholder.com/250'},{FileName: 'test1', Contents: 'https://via.placeholder.com/350'},{FileName: 'test1', Contents: 'https://via.placeholder.com/1350'},{FileName: 'test1', Contents: 'https://previews.123rf.com/images/blueringmedia/blueringmedia1502/blueringmedia150200178/36274214-a-big-potato-on-a-white-background.jpg'}],
		}),
		created() {
			window.addEventListener('keyup', e => {
				if(e.keyCode == 37) this.prevImage();
				if(e.keyCode == 39) this.nextImage();
				if(e.keyCode == 27) this.close();
			})
		},
		computed: {
			showAll() {
				return this.selected.length > 0;
			}
		},
		methods: {
			prevImage() {
				this.curImage > 0 && this.curImage--;
			},
			nextImage() {
				this.curImage != this.images.length-1 && this.curImage++;
			},
			close() {
				this.lightbox = false
			},
			clickOutside(e, el) {
				if(e.target.parentNode.id == 'menu' || e.target.classList.contains('arrows')) return;
				this.lightbox = false;
			},
			setImage(i) {
				this.curImage = i;
				this.lightbox = true;
			},
			deleteAll() {
				this.$emit(this.images)
			},
		}
	}
</script>