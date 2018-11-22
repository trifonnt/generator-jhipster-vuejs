<template>
	<div>
		<v-select
		  v-model = 'api'
          :items="apis"
          label="API"
          solo
        ></v-select>
		<div id='swagger'></div>
	</div>
</template>

<style>
	
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
			  		dom_id: '#swagger',
			  		url: this.api,
		  			plugins: [StandalonePreset],
					layout: 'StandaloneLayout',
			  		requestInterceptor: req => {
			  			req.headers['Authorization'] = 'Bearer ' + getProfile().jwt
			  		},
				})	
				console.log(swagger)	
				swagger.preauthorizeApiKey("Bearer", getProfile().jwt)
			})
		},
		data: () => ({
			api: '/v2/api-docs',
			apis: [
				{text: 'Api V2', value: '/v2/api-docs'},
				{text: 'Api V2 Management', value: '/v2/api-docs?group=management'},
			],
		}),
		watch: {
			api(val) {
				swagger = SwaggerUI({
			  		dom_id: '#swagger',
			  		url: val,
		  			plugins: [StandalonePreset],
					layout: 'StandaloneLayout',
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
