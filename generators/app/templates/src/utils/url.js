export function objtourl(obj) {
	return Object.entries(obj).map(e => e.join('=')).join('&')
}
export function urltoobj(url) {
	return JSON.parse('{"' + url.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
}
export function pushUrl(url) {
	let state = window.location.href.split('#')[1];
	if(state) url = '#' + state + '&'+url;
	else url = '#'+url;
	history.pushState({}, null, url);
}