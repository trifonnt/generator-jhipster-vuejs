

import axios from 'axios'

export function getEntityData(page=0, sort='id,asc', search='', size=10) {
	if(!search) return axios.get('users', {params: {paged: true, page, size, sort}});
	return axios.get('_search/users', {params: {paged: true, page, size, sort, query: search}});
}
export function getEntityCount(search='') {
	if(!search) return axios.get('users').then(data=>data.headers);
	return axios.get('_search/users', {params: {query: search}}).then(data=>data.headers);	
}
export function createEntity(obj) {
  
	return axios.post('users', obj)
}
export function editEntity(obj) {
   
	return axios.put('users', obj)
}
export function getEntityId(id) {
	return axios.get('users/'+id).then(data=>data.data)
}
export function deleteId(id) {
	return axios.delete('users/'+id).then(data=>data.data)
}
export function deleteAllItems(items) {
	let promises = items.map(id=>axios.delete('users/'+id).then(data=>data.data));
	return Promise.all(promises)
}
export function getLabels() {
	return axios.get('users/getLabels');
}
export function saveLabels(data) {
	return axios.post('users/labels', data);
}
export function saveItemOrder(left, right) {
	return axios.post('users/saveItemOrder', {left, right})
}
export function getItemOrder() {
	return axios.get('itemorder');
}
export function saveSearch(searchBy, values) {
	return axios.post('savesearch', {searchBy, values}).then(data=>data.data);
}

