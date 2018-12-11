import axios from 'axios'

export function getData(id='') {
	return axios.get('http://www.mocky.io/v2/5bf2d0cf2f0000df2fcfa2ae'/*+id*/).then(data=>data.data)
}

export function editWiki(id, content) {
	return axios.put('/editWiki', {id, content})
}

export function deleteWiki(id) {
	return axios.delete('/deleteWiki/'+id)
}

export function createWiki(content) {
	return axios.post('/createWiki/', {content})
}