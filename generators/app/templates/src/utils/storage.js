export function setObject(key, obj) {
	return localStorage.setItem(key, JSON.stringify(obj));
}
export function getObject(key) {
	return JSON.parse(localStorage.getItem(key));
}