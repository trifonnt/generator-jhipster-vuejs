import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import * as identity from './store/identity'
import VeeValidate from 'vee-validate';

import Datatable from 'vue2-datatable-component'

import VueI18n from 'vue-i18n'

import VueQuillEditor from 'vue-quill-editor'

import Datetime from 'vue-datetime'

import { Settings } from 'luxon'

import VueImg from 'v-img';

import Multiselect from 'vue-multiselect'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import 'vue-datetime/dist/vue-datetime.css'

import messages from '../i18n/';


import './directives/hasRole'

import './assets/styles.css'

import "vue-multiselect/dist/vue-multiselect.min.css"

import storex from './storex'

import {setProfile} from './store/identity'

window.$ = require('jquery')
window.JQuery = require('jquery')

axios.defaults.baseURL = "/api"

axios.interceptors.response.use(function (response) {
    
    return response;
  }, function (error) {
    if(error.status == 401) setProfile({})
    return Promise.reject(error);
  });

Vue.use(Datatable)

Vue.use(VueI18n)

Vue.use(VueQuillEditor, /* { default global options } */)

Vue.use(Datetime)

Vue.use(VueImg);

Vue.component('multiselect', Multiselect)

let lang = localStorage.getItem('langkey') || 'en';

//vue datetime luxon locale
Settings.defaultLocale = lang

class CustomFormatter {
     constructor (options) {
       // ...
     }
    
     //
     // interpolate
     //
     // @param {string} message
     //   string of list or named format.
     //   e.g.
     //   - named formatting: 'Hi {name}'
     //   - list formatting: 'Hi {0}'
     //
     // @param {Object | Array} values
     //   values of `message` interpolation.
     //   passed values with `$t`, `$tc` and `i18n` functional component.
     //   e.g. 
     //   - $t('hello', { name: 'kazupon' }) -> passed values: Object `{ name: 'kazupon' }` 
     //   - $t('hello', ['kazupon']) -> passed values: Array `['kazupon']`
     //   - `i18n` functional component (component interpolation)
     //     <i18n path="hello">
     //       <p>kazupon</p>
     //       <p>how are you?</p>
     //     </i18n>
     //     -> passed values: Array (included VNode):
     //        `[VNode{ tag: 'p', text: 'kazupon', ...}, VNode{ tag: 'p', text: 'how are you?', ...}]`
     //
     // @return {Array<any>}
     //   interpolated values. you need to return the following:
     //   - array of string, when is using `$t` or `$tc`.
     //   - array included VNode object, when is using `i18n` functional component.
     // 
     interpolate (message, values) {
		if(!values) return [message];
		Object.keys(values).forEach(function(k) {
			let val = values[k]
	        if(Array.isArray(val)) val = values[k].join()
	        var find = '{{ '+k+' }}';
			var re = new RegExp(find, 'g');
			message = message.replace(re, val);
		});
       return [message]
     }
}

const i18n = new VueI18n({
	locale: lang,
	messages,
	formatter: new CustomFormatter(),
})

Vue.use(VeeValidate, {
	inject: false,
	i18n,
	i18nRootKey: 'validations',
});

import * as test from './utils/test'
Vue.config.productionTip = false
console.log("AAAA")
identity.bootstrap();
new Vue({
  router,
  store: storex,
  i18n,
  render: h => h(App)
}).$mount('#app')