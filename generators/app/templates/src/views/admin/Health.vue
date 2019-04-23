<template>
	<div id='root'>
		<v-card class='statuscard'>
			<v-toolbar color='primary'>
				<v-toolbar-title>{{$t('health.health.title')}}</v-toolbar-title>
			</v-toolbar>

			<health-node id='rootnode' :children='children' name='Site'></health-node>
		</v-card>
	</div>
</template>

<script>
	import * as store from '../../store/stats'
	import HealthNode from './HealthNode.vue'

	export default {
		data: () => ({
			status: null,
			children: null,
		}),
		created() {
			this.getData();
		},
		methods: {
			async getData() {
				try {
					let res = await store.getHealth();
					this.children = res;
					console.log(res);
				}
				catch(err) {
					let msg = err.response.data.title;
		         	this.$store.dispatch('snackShowAction', {text: msg, val: true, color: "error"})
				}
			}
		},
		components: {
			HealthNode
		},
	}
</script>

<style>
	#rootnode {
		padding-top: 7px;
	}
	.statuscard {
		width: 50%;
	}
	#root {
	  height: 100vh;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	}
	.child {
		margin-left: 10px;
		margin-top: 10px;
		background: white;
	}
	@media only screen and (max-width: 600px) {
		.statuscard {
			width: 90%;
		}
		.child {
			margin-left: 3px;
		}
	}
	@media only screen and (max-width: 360px) {
		.statuscard {
			width: 90%;
		}
		.child {
			margin-left: 0;
		}
	}
</style>