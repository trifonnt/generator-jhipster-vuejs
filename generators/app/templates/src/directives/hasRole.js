import Vue from 'vue'

import {getProfile} from '../store/identity'

Vue.directive('hasRole', {
	inserted: function(el, b) {
		if(b.value != '') {
			if(!getProfile().jwt) el.style.display = 'none'
			if(getProfile().jwt && !getProfile().roles.includes(b.value)) el.style.display = 'none'			
		}
	}
})