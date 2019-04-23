import axios from 'axios'

export function getHealth() {
	return axios.get('/management/health').then(data=>data.data)
}

export function getLogs() {
	return axios.get('/management/logs').then(data=>data.data)
}

export function setLogsLevel(item, level) {
	item.level = level;
	return axios.put('/management/logs', item).then(data=>data.data)
}

export function getConfig() {
	return axios.get('/management/configprops').then(data=>data.data)
}

export function getMetrics() {
	return axios.get('/management/metrics').then(data=>data.data)
}