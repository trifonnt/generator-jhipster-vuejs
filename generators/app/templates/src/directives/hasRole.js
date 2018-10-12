import Vue from 'vue'

import {getProfile} from '../store/identity'

Vue.directive('hasRole', {
	inserted: function(el, b) {
		console.log(getProfile())
		if(!getProfile().roles.includes(b.value)) el.style.display = 'none'; 
	}
})