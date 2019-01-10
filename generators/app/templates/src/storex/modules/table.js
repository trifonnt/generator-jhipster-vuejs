import {objtourl, urltoobj} from '../../utils/url'

export default((name, name2, filterName, masterId)=> {
	let store;
	console.warn(name,name2)
	if(name2) store = require('../../store/'+name).default(name2);
	else store = require('../../store/'+name).default;
	console.warn(store)
	const state = {
		entity: {
			indeterminite: false,
			checkedDeleted: [],
			entitys: [],
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
			return state.entity.checkedDeleted.find(pid=>pid==id) || false;
		},
		allChecked(state) {
			return state.entity.checkedDeleted.length;
			//return state.entity.length == state.entity.checkedDeleted.length
		}
	}

	const actions = {
		async getData({state, commit}, {page, sort, search, rowsPerPage, labels, options, values}) {
	        try {
	          let sort = sort || '';
	          let page = page || state.entity.pagination.page;
	          let search = search || state.entity.search;
	          let rowsPerPage = rowsPerPage || state.entity.pagination.rowsPerPage;
	          let labels = labels || state.entity.pagination.labels;
	          if(state.entity.pagination.sortBy != null) {
	          	console.log(state.entity.pagination, "PAGEs")
	          	sort = state.entity.pagination.sortBy+',';
	          	let asc = state.entity.pagination.descending;
	          	console.log(state.entity.pagination.descending, "SORTME")
	         	if(state.entity.pagination.descending === true || state.entity.pagination.descending === "true") 
	         		sort+='desc';
	         	else sort+='asc';
	          }
	          console.log(sort,"SRT")
	          commit('changeLoading', true)
	          //let [count, response] = await Promise.all([store.getCountEntity(search, options, values, masterId),store.getData(page-1, sort, search, rowsPerPage, labels, options, values, masterId)]);
	          let response = await store.getData(page-1, sort, search, rowsPerPage, labels, options, values, masterId, filterName);
	          commit('changeLoading', false)
			  commit('getHeaders', response.headers['x-total-count'])
	          response = response.data;
	          response.map(vendor=>vendor.value=false)
	          commit('getEntitys', response)
	          console.log(state.entity.pagination)
	          history.pushState(state.entity.pagination, null, '#'+objtourl(state.entity.pagination))

	        }
	        catch(err) {console.log(err)}
		},
/*		async searchAdvanced({state, commit}, {options, values}) {
			commit('changeLoading', true)
        	let [headers, response] = await Promise.all([store.searchAdvanced(page-1, sort, search, rowsPerPage, labels)]);
			commit('changeLoading', false)
			commit('getHeaders', +headers['x-total-count'])
	        response = response.data;
	        response.map(vendor=>vendor.value=false)
	        commit('getentitys', response)
			commit('getHeaders', +headers['x-total-count'])

		},*/
		updateChecked({state, commit}, val) {
			if(val.checked)  commit('addToDeleted', val.value);
			else commit('removeFromDeleted', val.value)
			commit('checkIndeterminite')
		},
		checkCheckbox({state, commit}, vals) {
			commit('clearDeleted');
			for(val of vals) commit('addToDeleted', val);
		},
		changeSort ({state, commit, dispatch}, column) {
			let pagination = {};
	        if (state.entity.pagination.sortBy === column) {
	          pagination.descending = !state.entity.pagination.descending
	        } else {
	          pagination.sortBy = column
	          pagination.descending = false
	        }
	        dispatch('changeSortWatcher', pagination)
	    },
	    changePaginationWatcher({state, commit, dispatch}, pagination) {
	    	commit('changePagination', pagination)
	    	dispatch('getData', pagination)
	    },
	    changeSortWatcher({state, commit, dispatch}, pagination) {
	    	commit('changeSort', pagination)
	    	dispatch('getData', pagination)
	    },      
	    search({state, commit, dispatch}, query) {
	    	commit('setSearch', query);
	    	dispatch('getData', {search: query})
	    	commit('changePagination',{page: 1})
	    },
	}

	const mutations = {
		toggleAll(state, entitys) {
			state.entity.indeterminite = false;
			if (state.entity.checkedDeleted.filter(Number).length == state.entity.entitys.length) {
	          return state.entity.checkedDeleted = []
	        }
	        if(state.entity.checkedDeleted.filter(Number).length == 0) {
	          state.entity.checkedDeleted = state.entity.entitys.map(p=>p.id)
	        }
	        else {
	     	   return state.entity.checkedDeleted = [];
	    	}
		},
		deleteAllChecked(state) {
			state.entity.checkedDeleted = [];
		},
		clearDeleted(state) {
			state.checkedDeleted = [];
		},
		getEntitys(state, entitys) {
			state.entity.entitys = entitys;
			state.entity.length = entitys.length
		},
		getHeaders(state, count) {
			state.entity.totalItems = count;
		},
		addToDeleted(state, val) {
			state.entity.checkedDeleted.push(val);

		},
		checkIndeterminite(state) {
			state.entity.indeterminite = true;
			if(state.entity.checkedDeleted.length == state.entity.entitys.length || state.entity.checkedDeleted.length == 0) state.entity.indeterminite = false;
		},
		removeFromDeleted(state, val) {
			state.entity.checkedDeleted = state.entity.checkedDeleted.filter(id=>{return id!=val})
		},
		changePagination(state, pagination) {
			state.entity.pagination = Object.assign({}, state.entity.pagination, pagination.page);
			console.log(pagination)
		},
		changeSort(state, pagination) {
			console.log(pagination,"PAAAAAAAAAAAAGE")
			state.entity.pagination = Object.assign({}, state.entity.pagination, pagination);
		},
		deleteItem(state, item) {
			state.entity.deletedItem = Object.assign({}, state.entity.deletedItem, item);
			state.entity.dialog = true;
		},
		changeDialog(state, val) {
			state.entity.dialog = val;
		},
		changeLoading(state, val) {
			state.entity.loading = val;
		},
		setSearch(state, query) {
			state.entity.search = query;
		}
	}
	return {
		state,
		getters,
		actions,
		mutations,
	}
}) 