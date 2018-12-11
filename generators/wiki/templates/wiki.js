import * as fetcher from './fwiki'

export function getData(id='') {
	return fetcher.getData(id);
}

export function editWiki(id, content) {
	return fetcher.editWiki(id, content)
}

export function deleteWiki(id) {
	return fetcher.deleteWiki(id);
}

export function createWiki(content) {
	return fetcher.createWiki(content);
}