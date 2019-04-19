<template>
	<div>
        <div style='display: flex; justify-content: center;'>
        	<v-btn color='primary' v-for='(a,i) in apis' @click='api=a.value' :outline='api!==a.value'>{{a.text}}</v-btn>
        </div>
		<div id='swagger'></div>
	</div>
</template>

<style>
	.swagger-ui .information-container {
		display: none !important;
	}
</style>

<script>
	import SwaggerUI from 'swagger-ui'
	import 'swagger-ui/dist/swagger-ui.css';
	import StandalonePreset from 'swagger-ui/dist/swagger-ui-standalone-preset';

	import {getProfile} from '../../store/identity'

	let swagger;
	export default {
		mounted() {
			this.$nextTick(() => {
				swagger = SwaggerUI({
					docExpansion: 'none',
			  		dom_id: '#swagger',
			  		url: this.api,
		  			plugins: [StandalonePreset],
			  		requestInterceptor: req => {
			  			req.headers['Authorization'] = 'Bearer ' + getProfile().jwt
			  		},
				})	
				swagger.preauthorizeApiKey("Bearer", getProfile().jwt)
			})
		},
		data: () => ({
			active: 0,
			api: '/v2/api-docs',
			apis: [
				{text: 'Api V2', value: '/v2/api-docs'},
				{text: 'Api V2 Management', value: '/v2/api-docs?group=management'},
			],
		}),
		watch: {
			api(val) {
				swagger = SwaggerUI({
					docExpansion: 'none',
			  		dom_id: '#swagger',
			  		url: val,
		  			plugins: [StandalonePreset],
			  		requestInterceptor: req => {
			  			req.headers['Authorization'] = 'Bearer ' + getProfile().jwt
			  		},
				})	
				console.log(swagger)	
				swagger.preauthorizeApiKey("Bearer", getProfile().jwt)
			}
		}

	}
</script>
