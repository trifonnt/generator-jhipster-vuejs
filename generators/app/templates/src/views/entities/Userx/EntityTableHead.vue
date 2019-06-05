<template>
	<tr>
	<th width='10px'>
	  <v-checkbox
	  	:input-value = 'allChecked'
	    :indeterminate="indeterminite"
	    primary
	    hide-details
	    @change="$store.commit('toggleAll')"
	  ></v-checkbox>
	</th>
	<th width='10px'>Label</th>
		<th v-show='hideName!="login" && true' v-hasRole="'ROLE_USER,ROLE_ADMIN'"
		  :class="['column sortable', pagination.descending ? 'desc' : 'asc', 'login' === pagination.sortBy ? 'active' : '']"
		  @click="changeSort('login')"
		  :data-label='$t("userx.newappApp.userx.login")'
		>
		  	<v-icon small>arrow_upward</v-icon>
	  		{{$t("userx.newappApp.userx.login")}}
		</th>

		<th v-show='hideName!="firstName" && true' v-hasRole="'ROLE_USER,ROLE_ADMIN'"
		  :class="['column sortable', pagination.descending ? 'desc' : 'asc', 'firstName' === pagination.sortBy ? 'active' : '']"
		  @click="changeSort('firstName')"
		  :data-label='$t("userx.newappApp.userx.firstName")'
		>
		  	<v-icon small>arrow_upward</v-icon>
	  		{{$t("userx.newappApp.userx.firstName")}}
		</th>

		<th v-show='hideName!="lastName" && true' v-hasRole="'ROLE_USER,ROLE_ADMIN'"
		  :class="['column sortable', pagination.descending ? 'desc' : 'asc', 'lastName' === pagination.sortBy ? 'active' : '']"
		  @click="changeSort('lastName')"
		  :data-label='$t("userx.newappApp.userx.lastName")'
		>
		  	<v-icon small>arrow_upward</v-icon>
	  		{{$t("userx.newappApp.userx.lastName")}}
		</th>

		<th v-show='hideName!="email" && true' v-hasRole="'ROLE_USER,ROLE_ADMIN'"
		  :class="['column sortable', pagination.descending ? 'desc' : 'asc', 'email' === pagination.sortBy ? 'active' : '']"
		  @click="changeSort('email')"
		  :data-label='$t("userx.newappApp.userx.email")'
		>
		  	<v-icon small>arrow_upward</v-icon>
	  		{{$t("userx.newappApp.userx.email")}}
		</th>

		<th v-show='hideName!="activated" && true' v-hasRole="'ROLE_USER,ROLE_ADMIN'"
		  :class="['column sortable', pagination.descending ? 'desc' : 'asc', 'activated' === pagination.sortBy ? 'active' : '']"
		  @click="changeSort('activated')"
		  :data-label='$t("userx.newappApp.userx.activated")'
		>
		  	<v-icon small>arrow_upward</v-icon>
	  		{{$t("userx.newappApp.userx.activated")}}
		</th>

		<th v-show='hideName!="authorities" && true' v-hasRole="'ROLE_USER,ROLE_ADMIN'"
		  :class="['column sortable', pagination.descending ? 'desc' : 'asc', 'authorities' === pagination.sortBy ? 'active' : '']"
		  @click="changeSort('authorities')"
		  :data-label='$t("userx.newappApp.userx.authorities")'
		>
		  	<v-icon small>arrow_upward</v-icon>
	  		{{$t("userx.newappApp.userx.authorities")}}
		</th>

		<th v-show='hideName!="imageUrl" && true' v-hasRole="'ROLE_USER,ROLE_ADMIN'"
		  :class="['column sortable', pagination.descending ? 'desc' : 'asc', 'imageUrl' === pagination.sortBy ? 'active' : '']"
		  @click="changeSort('imageUrl')"
		  :data-label='$t("userx.newappApp.userx.imageUrl")'
		>
		  	<v-icon small>arrow_upward</v-icon>
	  		{{$t("userx.newappApp.userx.imageUrl")}}
		</th>

		<th v-show='hideName!="langKey" && true' v-hasRole="'ROLE_USER,ROLE_ADMIN'"
		  :class="['column sortable', pagination.descending ? 'desc' : 'asc', 'langKey' === pagination.sortBy ? 'active' : '']"
		  @click="changeSort('langKey')"
		  :data-label='$t("userx.newappApp.userx.langKey")'
		>
		  	<v-icon small>arrow_upward</v-icon>
	  		{{$t("userx.newappApp.userx.langKey")}}
		</th>


		<th v-show='hideName!="createdBy" && false' v-hasRole="'ROLE_USER,ROLE_ADMIN'"
		  :class="['column sortable', pagination.descending ? 'desc' : 'asc', 'createdBy' === pagination.sortBy ? 'active' : '']"
		  @click="changeSort('createdBy')"
		  :data-label='$t("userx.newappApp.userx.createdBy")'
		>
		  	<v-icon small>arrow_upward</v-icon>
	  		{{$t("userx.newappApp.userx.createdBy")}}
		</th>

		<th v-show='hideName!="createdDate" && false' v-hasRole="'ROLE_USER,ROLE_ADMIN'"
		  :class="['column sortable', pagination.descending ? 'desc' : 'asc', 'createdDate' === pagination.sortBy ? 'active' : '']"
		  @click="changeSort('createdDate')"
		  :data-label='$t("userx.newappApp.userx.createdDate")'
		>
		  	<v-icon small>arrow_upward</v-icon>
	  		{{$t("userx.newappApp.userx.createdDate")}}
		</th>

		<th v-show='hideName!="lastModifiedBy" && false' v-hasRole="'ROLE_USER,ROLE_ADMIN'"
		  :class="['column sortable', pagination.descending ? 'desc' : 'asc', 'lastModifiedBy' === pagination.sortBy ? 'active' : '']"
		  @click="changeSort('lastModifiedBy')"
		  :data-label='$t("userx.newappApp.userx.lastModifiedBy")'
		>
		  	<v-icon small>arrow_upward</v-icon>
	  		{{$t("userx.newappApp.userx.lastModifiedBy")}}
		</th>

		<th v-show='hideName!="lastModifiedDate" && false' v-hasRole="'ROLE_USER,ROLE_ADMIN'"
		  :class="['column sortable', pagination.descending ? 'desc' : 'asc', 'lastModifiedDate' === pagination.sortBy ? 'active' : '']"
		  @click="changeSort('lastModifiedDate')"
		  :data-label='$t("userx.newappApp.userx.lastModifiedDate")'
		>
		  	<v-icon small>arrow_upward</v-icon>
	  		{{$t("userx.newappApp.userx.lastModifiedDate")}}
		</th>



	
<!-- 	<th
	  v-for="header in data.headers"
	  :key="header.text"
	  :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
	  @click="changeSort(header.value)"
	  :data-label='header.text'

	> -->
	<th>Actions</th>
	</tr>
</template>

<script>
	import {mapGetters} from 'vuex'

	let vueObj = {};
	
	vueObj.computed = {
		allChecked() {
			return this.$store.getters.allChecked
		}
	};

	vueObj.methods = {
		changeSort(val) {
			this.$store.dispatch('changeSort', val)
		}
	};

    try {
      let extend = require('./EntityTableHeadFunctionsX')
      vueObj.data && Object.assign(vueObj.data, extend.data)
      vueObj.mehtods && Object.assign(vueObj.methods, extend.methods)
      vueObj.computed && Object.assign(vueObj.computed, extend.computed)
    } catch(err) {
      console.log(err)
    }

	export default {
		data: () => ({}),
		computed: vueObj.computed,
		methods: vueObj.methods,
		props: {
			data: Object,
			pagination: Object,
			indeterminite: Boolean,
			hideName: String,
		},
	}
</script>

<style>
	