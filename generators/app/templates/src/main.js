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

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import messages from './lang/';


import './directives/hasRole'

import './assets/styles.css'

import storex from './storex'

window.$ = require('jquery')
window.JQuery = require('jquery')

axios.defaults.baseURL = "/api"

Vue.use(VeeValidate, {
	inject: false,
});

Vue.use(Datatable)

Vue.use(VueI18n)

Vue.use(VueQuillEditor, /* { default global options } */)

let lang = localStorage.getItem('langkey') || 'en';

const i18n = new VueI18n({
	locale: lang,
	messages
})

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