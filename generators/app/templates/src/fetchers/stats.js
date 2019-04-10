import axios from 'axios'

export function getHealth() {
	return axios.get('/management/health').then(data=>data.data)
}