<template>
	<div v-if='Object.keys(audits).length'>
	  <v-toolbar color='primary'>
	  	<v-toolbar-title>
	  		{{$t('metrics.metrics.title')}}
	  	</v-toolbar-title>
	  </v-toolbar>
	  <v-card>
	  	<v-card-title><h3>{{$t('metrics.metrics.jvm.title')}}</h3></v-card-title>

	  	<div id='flex'>
		  	<div>
		  		<div>
		  			<div>
		  				<b>{{$t('metrics.metrics.jvm.memory.title')}}</b>
		  			</div>
		  		</div>
			    <div>
			    	<div>{{$t('metrics.metrics.jvm.memory.total')}}</div>
				    <v-progress-linear
				      :height="20"
				      :value="jvm.memory.used/jvm.memory.total*100"
				      color="green"
				    >
				      {{ Math.round(jvm.memory.used/jvm.memory.total*100) }}%
				    </v-progress-linear>
				</div>
			    <div>
			    	<div>{{$t('metrics.metrics.jvm.memory.heap')}}</div>
				    <v-progress-linear
				      :height="20"
				      :value="jvm.heapMemory.used/jvm.heapMemory.total*100"
				      color="green"
				    >
				      {{ Math.round(jvm.heapMemory.used/jvm.heapMemory.total*100) }}%
				    </v-progress-linear>
				</div>
			    <div>
			    	<div>{{$t('metrics.metrics.jvm.memory.nonheap')}}</div>
				    <v-progress-linear
				      :height="20"
				      :value="jvm.nonHeapMemory.used/jvm.nonHeapMemory.total*100"
				      color="green"
				    >
				      {{ Math.round(jvm.nonHeapMemory.used/jvm.nonHeapMemory.total*100) }}%
				    </v-progress-linear>
				</div>
			</div>
		  	<div>
		  		<div>
		  			<div><b>{{$t('metrics.metrics.jvm.threads.title')}}</b></div>
		  		</div>
			    <div>
			    	<div>{{$t('metrics.metrics.jvm.threads.runnable')}} ({{jvm.threads.runnable}})</div>
				    <v-progress-linear
				      :height="20"
				      :value="jvm.threads.runnable/jvm.threads.all*100"
				      color="green"
				    >
				      {{ Math.round(jvm.threads.runnable/jvm.threads.all*100) }}%
				    </v-progress-linear>
				</div>
			    <div>
			    	<div>{{$t('metrics.metrics.jvm.threads.timedwaiting')}} ({{jvm.threads.timed_waiting}})</div>
				    <v-progress-linear
				      :height="20"
				      :value="jvm.threads.timed_waiting/jvm.threads.all*100"
				      color="green"
				    >
				      {{ Math.round(jvm.threads.timed_waiting/jvm.threads.all*100) }}%
				    </v-progress-linear>
				</div>
			    <div>
			    	<div>{{$t('metrics.metrics.jvm.threads.waiting')}} ({{jvm.threads.waiting}})</div>
				    <v-progress-linear
				      :height="20"
				      :value="jvm.threads.waiting/jvm.threads.all*100"
				      color="green"
				    >
				      {{ Math.round(jvm.threads.waiting/jvm.threads.all*100) }}%
				    </v-progress-linear>
				</div>
			    <div>
			    	<div>{{$t('metrics.metrics.jvm.threads.blocked')}} ({{jvm.threads.blocked}})</div>
				    <v-progress-linear
				      :height="20"
				      :value="jvm.threads.blocked/jvm.threads.all*100"
				      color="green"
				    >
				      {{ Math.round(jvm.threads.blocked/jvm.threads.all*100) }}%
				    </v-progress-linear>
				</div>
			</div>
			<div>
				<div>{{$t('metrics.metrics.jvm.gc.title')}}</div>
				<div>
					<v-chip label color='primary'>{{$t('metrics.metrics.jvm.gc.marksweepcount')}}</v-chip>
					<span>{{jvm.garbage.sweepCount}}</span>
				</div>
				<div>
					<v-chip label color='primary'>{{$t('metrics.metrics.jvm.gc.marksweeptime')}}</v-chip>
					<span>{{jvm.garbage.sweepTime}}</span>
				</div>
				<div>
					<v-chip label color='primary'>{{$t('metrics.metrics.jvm.gc.scavengecount')}}</v-chip>
					<span>{{jvm.garbage.scavengeCount}}</span>
				</div>
				<div>
					<v-chip label color='primary'>{{$t('metrics.metrics.jvm.gc.scavengetime')}}</v-chip>
					<span>{{jvm.garbage.scavengeTime}}</span>
				</div>
			</div>
		</div>

	  </v-card>
	  <v-card>
	  	<v-card-title><h3>{{$t('metrics.metrics.jvm.http.title')}}</h3></v-card-title>
		  <v-data-table
		    v-if='Object.keys(audits).length'
		    :headers="headersRequest"
		    :items="itemsRequests"
		  >
		    <template slot="items" slot-scope="props">
		      <td :data-label='item.value' class="text-xs-left" v-for='item in headersRequest'>{{ props.item[item.value] }}</td>
		    </template>
		  </v-data-table>
	  </v-card>
  	  <v-card>
	  	<v-card-title><h3>{{$t('metrics.metrics.servicesstats.title')}}</h3></v-card-title>
			<v-layout wrap align-center>
			  <v-flex xs12 sm3 d-flex>
			 	  <v-text-field
				 	id='text'
				    v-model="searchServices"
				    append-icon="search"
				    label="Search services"
				    clearable
				  >
				  	
				  </v-text-field>
				  </v-flex>
			</v-layout>
		  <v-data-table
		    :headers="headersServices"
		    :items="filterServices"
		  >
		    <template slot="items" slot-scope="props">
		      <td :data-label='item.value' class="text-xs-left" v-for='item in headersServices'>{{ props.item[item.value] }}</td>
		    </template>
		  </v-data-table>
	  </v-card>
	  <v-card>
	  	<v-card-title><h3>{{$t('metrics.metrics.cache.title')}}</h3></v-card-title>
			<v-layout wrap align-center>
			  <v-flex xs12 sm3 d-flex>
			 	  <v-text-field
				 	id='text'
				    v-model="searchCache"
				    append-icon="search"
				    label="Search cache"
				    clearable
				  >
				  	
				  </v-text-field>
				  </v-flex>
			</v-layout>
		  <v-data-table
		    :headers="headersCache"
		    :items="filterCache"
		  >
		    <template slot="items" slot-scope="props">
		      <td :data-label='item.value' class="text-xs-left" v-for='item in headersCache'>{{ props.item[item.value] }}</td>
		    </template>
		  </v-data-table>
	  </v-card>
  	  <v-card>
	  	<v-card-title><h3>{{$t('metrics.metrics.datasource.title')}}</h3></v-card-title>
		  <v-data-table
		    :headers="headersDataSource"
		    :items="itemsDataSource"
		  >
		    <template slot="items" slot-scope="props">
		      <td :data-label='item.value' class="text-xs-left" v-for='item in headersDataSource'>{{ props.item[item.value] }}</td>
		    </template>
		  </v-data-table>
	  </v-card>
	</div>
</template>

<script>
	import * as store from '../../store/stats'
	export default {
		data: () => ({
			audits: [],
			searchServices: '',
			searchCache: '',
		}),
		mounted() {
			this.getData();
		},
		methods: {
			async getData() {
				try {
					let res = await store.getMetrics();
					this.audits = res;
				}
				catch(err) {
					console.log(err)
		         	this.$store.dispatch('snackShowAction', {text: err, val: true, color: "error"})
				}
			},
			getKeys(item) {
				return Object.keys(item);
			},
		},
		computed: {
			customFilter() {
				return this.audits.filter(o=>o.prefix.includes(this.search))
			},
			jvm() {
				return {
					memory: {
						used: this.audits.gauges['jvm.memory.heap.used'].value+this.audits.gauges['jvm.memory.non-heap.used'].value,
						total: this.audits.gauges['jvm.memory.heap.max'].value+this.audits.gauges['jvm.memory.non-heap.max'].value
					},
					heapMemory: {
						used: this.audits.gauges['jvm.memory.heap.used'].value,
						total: this.audits.gauges['jvm.memory.heap.max'].value
					},
					nonHeapMemory: {
						used: this.audits.gauges['jvm.memory.non-heap.used'].value,
						total: this.audits.gauges['jvm.memory.non-heap.committed'].value
					},
					threads: {
						all: this.audits.gauges['jvm.threads.count'].value,
						runnable: this.audits.gauges['jvm.threads.runnable.count'].value,
						timed_waiting: this.audits.gauges['jvm.threads.timed_waiting.count'].value,
						waiting: this.audits.gauges['jvm.threads.waiting.count'].value,
						blocked: this.audits.gauges['jvm.threads.blocked.count'].value,
					},
					garbage: {
						sweepCount: this.audits.gauges["jvm.garbage.PS-MarkSweep.count"].value,
						sweeptime: this.audits.gauges["jvm.garbage.PS-MarkSweep.time"].value,
						scavengeCount: this.audits.gauges["jvm.garbage.PS-Scavenge.count"].value,
						scavengeTime: this.audits.gauges["jvm.garbage.PS-Scavenge.time"].value,
					}
				}
			},
			headersRequest() {
				return [
					{text: this.$t('metrics.metrics.jvm.http.table.code'), value: 'code'},
					{text: this.$t('metrics.metrics.jvm.http.table.count'), value: 'count'},
					{text: this.$t('metrics.metrics.jvm.http.table.mean'), value: 'mean_rate'},
					{text: this.$t('metrics.metrics.jvm.http.table.average') + "(1 min)", value: 'm1_rate'},
					{text: this.$t('metrics.metrics.jvm.http.table.average') + "(5 min)", value: 'm5_rate'},
					{text: this.$t('metrics.metrics.jvm.http.table.average') + "(15 min)", value: 'm15_rate'},
				]
			},
			itemsRequests() {
				this.audits.meters["com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.notFound"].code = 'Not Found';
				this.audits.meters["com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.ok"].code = 'Ok';
				this.audits.meters["com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.serverError"].code = 'Server Error';
				return [
					this.audits.meters["com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.notFound"],
					this.audits.meters["com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.ok"],
					this.audits.meters["com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.serverError"],
				]
				
			},
			headersServices() {
				return [
					{text: this.$t('metrics.metrics.servicesstats.table.name'), value: 'name'},
					{text: this.$t('metrics.metrics.servicesstats.table.count'), value: 'count'},
					{text: this.$t('metrics.metrics.servicesstats.table.mean'), value: 'mean_rate'},
					{text: this.$t('metrics.metrics.servicesstats.table.min'), value: 'min'},
					{text: this.$t('metrics.metrics.servicesstats.table.p50'), value: 'p50'},
					{text: this.$t('metrics.metrics.servicesstats.table.p75'), value: 'p75'},
					{text: this.$t('metrics.metrics.servicesstats.table.p95'), value: 'p95'},
					{text: this.$t('metrics.metrics.servicesstats.table.p99'), value: 'p99'},
					{text: this.$t('metrics.metrics.servicesstats.table.max'), value: 'max'},
				]
			},
			itemsServices() {
				return Object.keys(this.audits.timers).map(key=>(this.audits.timers[key].name=key,this.audits.timers[key]))
				
			},
			filterServices() {
				return this.itemsServices.filter(o=>o.name.includes(this.searchServices))
			},
			headersCache() {
				return [
					{text: this.$t('metrics.metrics.cache.cachename'), value: 'name'},
					{text: this.$t('metrics.metrics.cache.hits'), value: 'cache-hits'},
					{text: this.$t('metrics.metrics.cache.misses'), value: 'cache-misses'},
					{text: this.$t('metrics.metrics.cache.gets'), value: 'cache-gets'},
					{text: this.$t('metrics.metrics.cache.puts'), value: 'cache-puts'},
					{text: this.$t('metrics.metrics.cache.removals'), value: 'cache-removals'},
					{text: this.$t('metrics.metrics.cache.evictions'), value: 'cache-evictions'},
					{text: this.$t('metrics.metrics.cache.hitPercent'), value: 'cache-hit-percentage'},
					{text: this.$t('metrics.metrics.cache.missPercent'), value: 'cache-miss-percentage'},
					{text: this.$t('metrics.metrics.cache.averageGetTime'), value: 'average-get-time'},
					{text: this.$t('metrics.metrics.cache.averagePutTime'), value: 'average-put-time'},
					{text: this.$t('metrics.metrics.cache.averageRemoveTime'), value: 'average-remove-time'},
				]
			},
			itemsCache() {
				let last = '';
				let newobj = {};
				Object.keys(this.audits.gauges).map(key=> {
					if(key.includes('domain')) {
						let key2 = key.split('domain.')[1];
						let len = key2.split('.').length -1;
						let keysplit = key2.split('.')
						let stat = keysplit[keysplit.length-1];
						if(len == 1) key2 = keysplit[0];
						if(len == 2) key2 = keysplit[0]+'.'+keysplit[1];
						if(last!=key2) newobj[key2] = {};
						newobj[key2][stat] = this.audits.gauges[key].value
						last = key2;
					}
				})
				return Object.keys(newobj).map(key=>(newobj[key].name=key,newobj[key]));
				
			},
			filterCache() {
				return this.itemsCache.filter(o=>o.name.includes(this.searchCache))
			},
			headersDataSource() {
				return [
					{text: $t('metrics.metrics.datasource.title'), value: 'name'},
					{text: $t('metrics.metrics.datasource.count'), value: 'count'},
					{text: $t('metrics.metrics.datasource.mean'), value: 'mean_rate'},
					{text: $t('metrics.metrics.datasource.min'), value: 'min'},
					{text: $t('metrics.metrics.datasource.p50'), value: 'p50'},
					{text: $t('metrics.metrics.datasource.p75'), value: 'p75'},
					{text: $t('metrics.metrics.datasource.p95'), value: 'p95'},
					{text: $t('metrics.metrics.datasource.p99'), value: 'p99'},
					{text: $t('metrics.metrics.datasource.max'), value: 'max'},
				]
			},
			itemsDataSource() {
				return Object.keys(this.audits.histograms).map(key=>(this.audits.histograms[key].name=key,this.audits.histograms[key]))
				
			},
		},
	}
</script>

<style scoped>
	.properties {
		text-align: right;
	}
	#flex {
		display: flex;
	}
	#flex > div {
		margin: 10px;
		flex: 1;
	}
	.fleft {
		float: left;
	}
	.fright {
		float: right;
	}
	>>>.v-progress-linear__content {
		text-align: center;
	}
</style>