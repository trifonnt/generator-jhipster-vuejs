import * as storage from '../utils/storage'
import cookie from 'cookies-js'
import axios from 'axios'

export const user = {
	auth: false,
	profile: null,
}
export function setProfile(profile=null) {
	user.auth = !!profile;
	user.profile = profile;
	storage.setObject('profile', profile)
}
export function getProfile() {
	return user.profile || storage.getObject('profile')
}
export function setCookie(username, password) {
	cookie.set('username', username, {expires: 30*24*60*60})
	cookie.set('password', password, {expires: 30*24*60*60})
}
export function deleteCookie() {
	cookie.expire('username')
	cookie.expire('password')
}
export function bootstrap() {
	let profile = getProfile()
	if(profile && profile.jwt) {
		user.auth = true;
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + profile.jwt;
	}
}
export function logout() {
	user.auth = false;
	setProfile(null);
	storage.setObject("profile",{})
}