import axios from 'axios'

let obj = {};

obj.getData = function(id='') {
	return axios.get('http://www.mocky.io/v2/5bf2d0cf2f0000df2fcfa2ae'/*+id*/).then(data=>data.data)
}

obj.editWiki = function(id, content) {
	return axios.put('/editWiki', {id, content})
}

obj.deleteWiki = function(id) {
	return axios.delete('/deleteWiki/'+id)
}

obj.createWiki = function(content) {
	return axios.post('/createWiki/', {content})
}

try {
	let extend = require('./fwikiExtend')
	Object.assign(obj, extend)
} catch(err) {
	console.log(err)
}