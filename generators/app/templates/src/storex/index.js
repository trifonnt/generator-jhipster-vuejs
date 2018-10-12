import Vue from 'vue'
import Vuex from 'vuex'
import table from './modules/table'
import app from './modules/app'
import detail from './modules/detail'

import _ from 'lodash'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	modules: {
		table,
		app,
		detail,
	},
	strict: debug,
})

export function createStore(name, name2) {
	let table = require('./modules/table').default(name, name2);
    return new Vuex.Store({
        modules: {
            table: table, //_.cloneDeep?
            app: app,
            detail: detail,
        },
    });
}