import {login as auth, register as sign, forgot as forgotten, reset as resetPass, getAccount, changeAccount, changePassword} from '../fetchers/login.js'
import * as identity from './identity'
import axios from 'axios'
export async function login(username, password, remember) {
	try {
		let response = await auth(username, password, remember);
		let jwt = response.id_token;
		axios.defaults.headers.common['Authorization'] = 
                                'Bearer ' + jwt;
        if(!remember) jwt = null;
        console.log(jwt)
        let account = await getAccount();
        let roles = account.authorities;
        identity.user.auth = true;
		identity.setProfile({username, jwt, roles});
	}
	catch(err) {}
}
export async function register(username, password, email) {
	try {
		let response = await sign(username, password, email)
	}
	catch(err) {throw err}
}
export async function forgot(email) {
	try {
		let response = await forgotten(email)
	}
	catch(err) {throw err}
}
export async function reset(key, password) {
	try {
		let response = await resetPass(key, password)
	}
	catch(err) {throw err}
}
export async function changeAcc(firstName, lastName, email, langKey, login) {
	try {
		let response = await changeAccount(firstName, lastName, email, langKey, login)
	}
	catch(err) {throw err}
}
export async function changePass(cpassword, password) {
	try {
		let response = await changePassword(cpassword, password)
	}
	catch(err) {throw err}
}
export async function getAcc() {
	return getAccount();
}
