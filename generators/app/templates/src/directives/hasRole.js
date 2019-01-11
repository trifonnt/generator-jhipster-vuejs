import Vue from 'vue'

import {getProfile} from '../store/identity'

Vue.directive('hasRole', {
	inserted: function(el, b) {
		if(b.value != '') {
			if(!getProfile().jwt) el.style.display = 'none'
			else if(b.value.includes(',') 
				&& getProfile().jwt 
				&& b.value.split(',').some(r=>!getProfile().roles.includes(r)).length==0) el.style.display = 'none'
			else if(!b.value.includes(',') && getProfile().jwt && !getProfile().roles.includes(b.value)) el.style.display = 'none'			
		}
	},
	componentUpdated: function(el, b) {
		if(b.value != '') {
			if(!getProfile().jwt) el.style.display = 'none'
			else if(b.value.includes(',') 
				&& getProfile().jwt 
				&& b.value.split(',').some(r=>!getProfile().roles.includes(r)).length==0) el.style.display = 'none'
			else if(!b.value.includes(',') && getProfile().jwt && !getProfile().roles.includes(b.value)) el.style.display = 'none'			
		}
	},
	update: function(el, b) {
		if(b.value != '') {
			console.log(getProfile(), "PROFILE")
			if(!getProfile().jwt) el.style.display = 'none'
			else if(b.value.includes(',') 
				&& getProfile().jwt 
				&& b.value.split(',').some(r=>!getProfile().roles.includes(r)).length==0) el.style.display = 'none'
			else if(!b.value.includes(',') && getProfile().jwt && !getProfile().roles.includes(b.value)) el.style.display = 'none'			
		}
	}
})