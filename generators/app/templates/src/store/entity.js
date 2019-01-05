import _ from 'lodash'

export default((name) => {
	let fetcher = require('../fetchers/'+name)
	return {
		async getData(page=0, sort="id,asc", search='', size=10, labels= '', options='',values='',masterId='', filterName = '') {
			return fetcher.getEntityData(page, sort, search, size, masterId, filterName);
		},
		async getManagers() {
			try {
				let response = await fetcher.getManagersData();
				return response.map(u=>({value:u.id, text: u.login}))
			}
			catch(err) {console.log(err)}
		},
		async getEntityById(id) {
			return fetcher.getEntityId(id)
		},
		async getEntityByTemplate() {
			return fetcher.getEntityTemplate();
		},
		async getEntityPrefilled(id, name) {
			return fetcher.getEntityPrefilled(id, name);
		},
		async create(obj) { //eid, code, name, desc, active, ean, qty
			return fetcher.createEntity(obj);
		},
		async edit(obj) { //id, eid, code, name, desc, ean, qty, active
			return fetcher.editEntity(obj);
		},
		async deleteItemById(id) {
			return fetcher.deleteId(id);
		},
		async getCountEntity(search='', options='', values='',masterId='') {
			return fetcher.getEntityCount(search,masterId)
		},
		async deleteAll(items) {
			return fetcher.deleteAllItems(items)
		},
		async getLabels() {
			return fetcher.getLabels();
		},
		async saveLabels(fields, labels) {
			return fetcher.saveLabels({ids: fields, labels})
		},
		async saveItemOrder(left, right) {
			return fetcher.saveItemOrder(left, right)
		},
		async getItemOrder() {
			return fetcher.getItemOrder();
		},
		async searchAdvanced(searchBy, values) {
			return fetcher.searchAdvanced(searchBy, values);
		},
		async saveSearch(searchBy, values) {
			return fetcher.saveSearch(searchBy, values);
		},
	}
})