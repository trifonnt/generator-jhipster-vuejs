import axios from 'axios'

export function login(username, password, remember) {
	return axios.post('authenticate',{username,password,rememberMe: remember}).then(data=>data.data);
}
export function register(username, password, email) {
	return axios.post('register', {login: username, password, email}).then(data=>data.data);
}
export function forgot(email) {
	return axios.post('account/reset-password/init', {mail: email}).then(data=>data.data);
}
export function reset(key, password) {
	return axios.post('account/reset-password/finish', {key, newPassword: password}).then(data=>data.data);
}
export function getAccount() {
	return axios.get('account').then(data=>data.data);
}
export function changeAccount(firstName, lastName, email, langKey, login) {
	return axios.post('account', {firstName, lastName, email, langKey, login}).then(data=>data.data)
}
export function changePassword(cpassword, password) {
	return axios.post('account/change-password', {currentPassword: cpassword, newPassword: password}).then(data=>data.data)
}