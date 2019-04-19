import axios from 'axios'

export function getHealth() {
	return axios.get('/management/health').then(data=>data.data)
}

export function getAudits() {
	return axios.get('/management/audits').then(data=>data.data.map(o=>{
		o.data = o.data || '';
		return o;
	}));
}