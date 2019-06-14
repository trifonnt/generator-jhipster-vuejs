import * as fetcher from './fwiki'

let obj = {};

obj.getData = function(id='') {
	return fetcher.getData(id);
}

obj.editWiki = function(id, content) {
	return fetcher.editWiki(id, content)
}

obj.deleteWiki = function(id) {
	return fetcher.deleteWiki(id);
}

obj.createWiki = function(content) {
	return fetcher.createWiki(content);
}

try {
	let extend = require('./wikiExtend')
	Object.assign(obj, extend)
} catch(err) {
	console.log(err)
}