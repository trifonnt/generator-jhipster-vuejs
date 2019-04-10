<template>
	<div class='node'>
		<div class='nodeinfo' color='grey lighten-3'>
			<div>{{name}}</div>
			<div class='nodedetails'>
				<div v-if="typeof entries[0][1] !='object'">
					<v-dialog width='400px' v-model='dialog'>
						<v-btn slot='activator' color='primary'>Details</v-btn>
						<v-card>
							<v-toolbar color='primary'>{{name}} details</v-toolbar>
							<v-card-text>
								<v-card color='light-blue' v-for='(val,detail) in children.details' class='detailslist'>
									<v-chip label color='grey lighten-2'>{{detail}}</v-chip><span class='white--text'>{{val}}</span>
								</v-card>
							</v-card-text>
						</v-card>
					</v-dialog>
				</div>
				<div>
					<v-btn outline :class='{status:true, greenStatus:children.status == "UP",redStatus:children.status !="UP"}'>
						<v-icon v-show='children.status=="UP"'>arrow_upward</v-icon>
						<v-icon v-show='children.status=="DOWN"'>arrow_downward</v-icon>
						{{children.status}}
					</v-btn>
				</div>
			</div>
		</div>
		<div class='child'><health-node v-if='child && child.status' v-for='(child,name) in children.details' :children='child' :name='name'></health-node></div>
	</div>
</template>

<script>
	import * as store from '../../store/stats'

	export default {
		name: 'healthNode',
		props: ['children', 'name'],
		data: () => ({
			dialog: false,
		}),
		created() {

		},
		computed: {
			entries() {
				return this.children && this.children.details && Object.entries(this.children.details);
			}
		},
		methods: {

		}
	}
</script>

<style scoped>
	.status {
		width: 100px;
		margin-left: 10px;
		border-radius: 3px;
	}
	.detailslist {
		margin-top: 10px;
		max-width: 500px;
	}
	.detailslist > .v-chip {
		width: 80px;
	}
	.nodeinfo {
		padding: 7px;
		display: flex;
		align-items: center;
		background: #EEEEEE;
	    box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12);
	}
	.nodedetails {
		margin-left: auto;
	}
	.nodedetails > div {
		display: inline-block;
	}
	.node {
		padding: 3px;
	}
	.greenStatus {
		color: green;
	}
	.redStatus {
		color: red;
	}
</style>