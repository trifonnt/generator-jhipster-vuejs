import axios from '../modules/axios'

export function getEntityData(page=0, sort='id,asc', search='', size=10, masterId='', filterName = '') {
	let obj = {paged: true, page, size, sort};
	if(filterName) obj[filterName] = masterId;
	if(search) obj.query = search;
	if(!search) return axios.get('users', {params: obj});
	return axios.get('_search/users', {params: obj});
}
export function getEntityCount(search='*', masterId='', filterName = '') {
	return axios.get('_search/users', {params: {query: search, [filterName]: masterId}}).then(data=>data.headers['x-total-count']);	
}
export function createEntity(obj) {
  
	return axios.post('users', obj).then(data=>data.data);
}
export function editEntity(obj) {
   
	return axios.put('users', obj).then(data=>data.data);
}
export function getEntityId(id) {
	return axios.get('users/'+id).then(data=>data.data)
}
export function getEntityTemplate() {
	return axios.get('users/template').then(data=>data.data)
}
export function getEntityPrefilled(id,name, masterName) {
	return axios.get(masterName.toLowerCase() + '/'+id+'/'+name.toLowerCase()+'/template')
}
export function deleteId(id) {
	return axios.delete('users/'+id).then(data=>data.data)
}
export function deleteAllItems(items) {
	return axios.delete('users', {data: {ids: items}}).then(data=>data.headers)
	/* let promises = items.map(id=>axios.delete('users/'+id).then(data=>data.data));
	return Promise.all(promises) */
}
export function getLabels() {
	return axios.get('users/getLabels');
}
export function saveLabels(data) {
	return axios.post('users/labels', data);
}
export function saveItemOrder(left, right) {
	return axios.post('users/saveItemOrder', {left, right}).then(data=>data.data)
}
export function getItemOrder() {
	return axios.get('itemorder').then(data=>data.data);
}
export function saveSearch(searchBy, values) {
	return axios.post('savesearch', {searchBy, values}).then(data=>data.data);
}
export function uploadFile(file, name) {
	let ct = name + 'ContentType';
	let fn = name + 'FileName';
	let fs = name + 'FileSize'
	return axios.post('files', {order: file.previewElement.dataset, file: file.dataURL.split('base64,')[1], fileFileName: file.name, fileContentType: file.type, fileFileSize: file.size}).then(data=>data.data)
}
export function getFiles(ids) {
	return axios.get('/files/'+ids).then(data=>data.data);
}
export function deleteImage(id) {
	if(Array.isArray(id)) {
		return axios.delete('/files', {data: {ids: id }}).then(data=>data);
	}
	return axios.delete('/files/'+id).then(data=>data.data)
}
export function updateField(masterId, fieldName, val) {
	return axios.put('countries'+masterId+'/updateField', {fieldName, val})
}
