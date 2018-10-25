import _ from 'lodash'

export default((name) => {
	let fetcher = require('../fetchers/'+name)
	return {
		async getData(page=0, sort="id,asc", search='', size=10) {
			return fetcher.getEntityData(page, sort, search, size);
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
		async create(obj) { //eid, code, name, desc, active, ean, qty
			return fetcher.createEntity(obj);
		},
		async edit(obj) { //id, eid, code, name, desc, ean, qty, active
			return fetcher.editEntity(obj);
		},
		async deleteItemById(id) {
			return fetcher.deleteId(id);
		},
		async getCountEntity(search='') {
			return fetcher.getEntityCount(search)
		},
		async deleteAll(items) {
			return fetcher.deleteAllItems(items)
		},
		async saveLabels(fields, labels) {
			return fetcher.saveLabels({ids: fields, labels})
		},
	}
})