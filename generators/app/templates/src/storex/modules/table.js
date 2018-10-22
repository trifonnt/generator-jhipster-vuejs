import {objtourl, urltoobj} from '../../utils/url'

export default((name, name2)=> {
	let store;
	console.warn(name,name2)
	if(name2) store = require('../../store/'+name).default(name2);
	else store = require('../../store/'+name).default;
	console.warn(store)
	const state = {
		product: {
			indeterminite: false,
			checkedDeleted: [],
			products: [],
			pagination: {
				page: 1,
				rowsPerPage: 10,
				totalItems: 0,
			},
			totalItems: 0,
			length: 0,
			deletedItem: {},
			dialog: false,
			search: '',
			loading: true,
		}

	}

	const getters = {
		isChecked: (state)=>(id)=>{
			return state.product.checkedDeleted.find(pid=>pid==id) || false;
		},
		allChecked(state) {
			return state.product.checkedDeleted.length;
			//return state.product.length == state.product.checkedDeleted.length
		}
	}

	const actions = {
		async getData({state, commit}, {page, sort, search, rowsPerPage}) {
	        try {
	          let sort = '';
	          let page = state.product.pagination.page;
	          let search = state.product.search;
	          let rowsPerPage = state.product.pagination.rowsPerPage;
	          if(state.product.pagination.sortBy != null) {
	          	console.log(state.product.pagination, "PAGEs")
	          	sort = state.product.pagination.sortBy+',';
	          	let asc = state.product.pagination.descending;
	         	if(state.product.pagination.descending === true || state.product.pagination.descending === "true") 
	         		sort+='desc';
	         	else sort+='asc';
	          }
	          console.log(sort,"SRT")
	          commit('changeLoading', true)
	          let [headers, response] = await Promise.all([store.getCountEntity(search),store.getData(page-1, sort, search, rowsPerPage)]);
	          commit('changeLoading', false)
			  commit('getHeaders', +headers['x-total-count'])
	          response = response.data;
	          response.map(vendor=>vendor.value=false)
	          commit('getProducts', response)
	          history.pushState({}, null, '#'+objtourl(state.product.pagination))

	        }
	        catch(err) {console.log(err)}
		},
		updateChecked({state, commit}, val) {
			if(val.checked)  commit('addToDeleted', val.value);
			else commit('removeFromDeleted', val.value)
			commit('checkIndeterminite')
		},
		changeSort ({state, commit, dispatch}, column) {
			let pagination = {};
	        if (state.product.pagination.sortBy === column) {
	          pagination.descending = !state.product.pagination.descending
	        } else {
	          pagination.sortBy = column
	          pagination.descending = false
	        }
	        dispatch('changePaginationWatcher', pagination)
	    },
	    changePaginationWatcher({state, commit, dispatch}, pagination) {
	    	commit('changePagination', pagination)
	    	dispatch('getData', {})
	    },    
	    search({state, commit, dispatch}, query) {
	    	commit('setSearch', query);
	    	dispatch('getData', {search: query})
	    	commit('changePagination',{page: 1})
	    },
	}

	const mutations = {
		toggleAll(state, products) {
			state.product.indeterminite = false;
			if (state.product.checkedDeleted.filter(Number).length == state.product.products.length) {
	          return state.product.checkedDeleted = []
	        }
	        if(state.product.checkedDeleted.filter(Number).length == 0) {
	          state.product.checkedDeleted = state.product.products.map(p=>p.id)
	        }
	        else {
	     	   return state.product.checkedDeleted = [];
	    	}
		},
		deleteAllChecked(state) {
			state.product.checkDeleted = [];
		},
		clearDeleted(state) {
			state.checkedDeleted = [];
		},
		getProducts(state, products) {
			state.product.products = products;
			state.product.length = products.length
		},
		getHeaders(state, count) {
			state.product.totalItems = count;
		},
		addToDeleted(state, val) {
			state.product.checkedDeleted.push(val);

		},
		checkIndeterminite(state) {
			state.product.indeterminite = true;
			if(state.product.checkedDeleted.length == state.product.products.length || state.product.checkedDeleted.length == 0) state.product.indeterminite = false;
		},
		removeFromDeleted(state, val) {
			state.product.checkedDeleted = state.product.checkedDeleted.filter(id=>{return id!=val})
		},
		changePagination(state, pagination) {
			state.product.pagination = Object.assign({}, state.product.pagination, pagination);
			console.log(pagination)
		},
		deleteItem(state, item) {
			state.product.deletedItem = Object.assign({}, state.product.deletedItem, item);
			state.product.dialog = true;
		},
		changeDialog(state, val) {
			state.product.dialog = val;
		},
		changeLoading(state, val) {
			state.product.loading = val;
		},
		setSearch(state, query) {
			state.product.search = query;
		}
	}
	return {
		state,
		getters,
		actions,
		mutations,
	}
}) 